// src/app/api/messages/[conversationId]/index.js
// src/app/api/messages/[conversationId]/index.js
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(req) {
  const conversationId = 1;

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          }
        }
      },
      orderBy: {
        time: 'asc',
      },
    });

    // Use the new Response constructor to return data
    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    // Return a new Response for error cases
    return new Response(JSON.stringify({ error: "Failed to fetch messages" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}


export async function POST(req) {
  // Assuming the request body is properly parsed into JSON format
  const body = await req.json();

  // Hardcoded user IDs for sender and recipient for demonstration
  const senderId = 1; // Sender's user ID is hardcoded to 1
  const recipientId = 2; // Recipient's user ID is hardcoded to 2
  const conversationId = 1; // Also hardcoded for this example
  
  try {
      const { content } = body;

      if (!content) {
          return new NextResponse(JSON.stringify({ error: 'Content is required' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' }
          });
      }

      const newMessage = await prisma.message.create({
          data: {
              content,
              senderId, // Using the hardcoded sender ID
              recipientId, // Using the hardcoded recipient ID
              conversationId, // This should correspond to an existing conversation
              time: new Date(),
              request: false, // Depending on your logic, adjust this field
          },
      });

      return new NextResponse(JSON.stringify(newMessage), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
      });
  } catch (error) {
      console.error('Failed to send message:', error);
      return new NextResponse(JSON.stringify({ error: 'Failed to send message', details: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
      });
  }
}