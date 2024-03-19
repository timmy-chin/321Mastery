import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';
import fetch from 'node-fetch'; // If node-fetch is not installed, use 'npm install node-fetch'

export async function POST(request) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const firstName = data.get('firstname');
  const lastName = data.get('lastname');
  const confirmation = data.get('confirmation');
  const age = data.get('age');
  const gender = data.get('gender');

  
  if (email && password && firstName && lastName && confirmation === password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Create the user in your database
      let user = await prisma.user.create({
        data: { 
          email: email, 
          password: hashedPassword, 
          firstName: firstName, 
          lastName: lastName,
          age: age,
          gender: gender 
        },
      });

      // Create the ChatEngine user
      const chatEngineUser = await createChatEngineUser(email, "notsecret");

      // Update the user's record in your database with the ChatEngine secret
      if (chatEngineUser && chatEngineUser.secret) {
        user = await prisma.user.update({
          where: { email: email },
          data: { chatEngineSecret: chatEngineUser.secret ,
          chatEngineId: chatEngineUser.id,}
        });
      }

      console.log('ChatEngine User Created:', chatEngineUser);
      console.log('User Updated with ChatEngine Secret:', user);
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  } else {
    return new Response(JSON.stringify({ error: 'A field is not defined or confirmation does not match' }), { status: 400 });
  }
}

async function createChatEngineUser(email, secret) {
  const response = await fetch('https://api.chatengine.io/users/', {
    method: 'POST',
    headers: {
      'Private-Key': process.env.CHATENGINE_PRIVATE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email,
      secret: secret,
    }),
  });

  if (!response.ok) {
    throw new Error(`ChatEngine user creation failed: ${response.statusText}`);
  }

  return await response.json();
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
      return NextResponse.json({error: e.message}, {status: 500 })
    }
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: 'Email or Password not defined' }, { status: 500 });
}
