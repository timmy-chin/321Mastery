import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  // Check if the user is logged in and retrieve their data
  const loggedInData = await checkLoggedIn();

  // If no user is logged in, return an error
  if (!loggedInData || !loggedInData.loggedIn || !loggedInData.user) {
    return new Response(JSON.stringify({ error: 'User not signed in' }), { status: 403 });
  }

  // Retrieve the currently logged-in user's ID
  const userId = loggedInData.user.id;

  try {
    // Fetch the user's details based on the user ID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // If the user is found, return their email and the hardcoded secret
    if (user) {
      const email = user.email;
      const hardcodedSecret = "your_predefined_hardcoded_secret"; // The predefined hardcoded secret
      return new Response(JSON.stringify({ email: email, secret: hardcodedSecret }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      // If the user is not found in the database
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
  } catch (error) {
    // In case of any errors during the process
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 });
  }
}
