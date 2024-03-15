import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { checkLoggedIn } from '@/lib/auth';
import fetch from 'node-fetch'; // Ensure node-fetch is installed for server-side fetching

// Function to update the ChatEngine user's secret
async function updateChatEngineUserSecret(chatEngineUserId, newSecret) {
  const response = await fetch(`https://api.chatengine.io/users/${chatEngineUserId}/`, {
    method: 'PATCH',
    headers: {
      'Private-Key': process.env.CHATENGINE_PRIVATE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ secret: newSecret }),
  });

  if (!response.ok) {
    throw new Error(`ChatEngine user secret update failed: ${response.statusText}`);
  }

  return await response.json();
}

export async function GET(request) {
  const loggedInData = await checkLoggedIn(request);

  if (!loggedInData || !loggedInData.loggedIn || !loggedInData.user) {
    // Fixed the issue with the response status code by correctly setting the status
    return new NextResponse(JSON.stringify({ error: 'User not signed in' }), { status: 403 });
  }

  const userId = loggedInData.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Assuming you want to update the secret before returning credentials
    const hardcodedSecret = "newHardcodedSecret"; // Define your new hardcoded secret here
    await updateChatEngineUserSecret(user.chatEngineId, hardcodedSecret);

    // Optionally, update your database with the new secret if needed
    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { chatEngineSecret: hardcodedSecret },
    });

    // Return the user's email and the updated ChatEngine secret
    return new NextResponse(JSON.stringify({ email: user.email, secret: hardcodedSecret }), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
