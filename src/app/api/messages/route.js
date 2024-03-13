// src/app/api/messages/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";


export async function GET(req, res) {
  const loggedInData = await checkLoggedIn(req);
  const userId = loggedInData.user?.id;

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        participants: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        messages: {
          orderBy: {
            time: 'desc',
          },
          take: 1,
          include: {
            sender: true, 
          } 
        },
      },
    });

    return new Response(JSON.stringify(conversations), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch conversations" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
