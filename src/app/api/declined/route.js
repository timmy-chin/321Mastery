import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function POST(request) {
    const loggedInData = await checkLoggedIn();
    if (loggedInData.loggedIn) {
      const { postId, riderId } = await request.json();
      const post = await prisma.Declined.create({
        data: {
          postId: postId,
          riderId: riderId
        }
      });
      return NextResponse.json(post);
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }


  export async function GET(request) {
    const loggedInData = await checkLoggedIn();
    const searchParams = request.nextUrl.searchParams
    const postId = searchParams.get('postId');

    if (postId != null && postId.length != 0){
        const allRequest = await prisma.Declined.findMany({
          where: {
            postId: {
              equals: parseInt(postId)
            }
          }
        });
        return NextResponse.json(allRequest);
      }
  
    const declined = await prisma.Declined.findMany({
        where: {
            riderId: {
              equals: loggedInData.user?.id
            }
          }
    });
  
    return NextResponse.json(declined);
  }