import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';
import axios from 'axios'; // Ensure axios is imported

export async function POST(request) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const firstName = data.get('firstname');
  const lastName = data.get('lastname');
  const confirmation = data.get('confirmation');
  
  if (email && password && firstName && lastName && confirmation === password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create the user in your database
      let user = await prisma.user.create({
        data: { email, password: hashedPassword, firstName, lastName },
      });

      // Explicitly set a hardcoded secret for the ChatEngine user creation
      const hardcodedSecret = "your_predefined_hardcoded_secret"; // Replace with your actual hardcoded secret
      const chatEngineUser = await createChatEngineUser(email, hardcodedSecret);

      // Update the user's record in your database with the ChatEngine secret and ID
      if (chatEngineUser && chatEngineUser.secret) {
        user = await prisma.user.update({
          where: { email: email },
          data: { chatEngineSecret: hardcodedSecret, chatEngineId: chatEngineUser.id } // Use the hardcoded secret for update
        });
      }

      console.log('ChatEngine User Created:', chatEngineUser);
      console.log('User Updated with ChatEngine Secret:', user);
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (e) {
      console.error(`User creation failed: ${e}`);
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: 'A field is not defined or confirmation does not match' }), { status: 400 });
  }
}

async function createChatEngineUser(email, secret) {
  try {
    const response = await axios.post('https://api.chatengine.io/users/', {
      username: email,
      secret: secret, // This secret is the hardcoded value you provide
    }, {
      headers: {
        'Private-Key': process.env.CHATENGINE_PRIVATE_KEY,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(`ChatEngine user creation failed: ${error}`);
    throw new Error(`ChatEngine user creation failed: ${error.response.statusText}`);
  }
}

export async function GET(request){
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  if (email && password){
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try {
      user = await prisma.user.findUnique({
        where: {
          email: email,
          password: hashedPassword,
        },
      });
    } catch (e) {
      console.error(`User lookup failed: ${e}`);
      return NextResponse.json({error: e.message}, {status: 500 })
    }
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: 'Email or Password not defined' }, { status: 500 });
}
