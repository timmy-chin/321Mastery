import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function POST(request) {
    const loggedInData = await checkLoggedIn();
    if (loggedInData.loggedIn) {
      const { postId } = await request.json();
      const post = await prisma.RiderRequest.create({
        data: {
          postId: postId,
          riderId: loggedInData.user?.id
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
    const riderId = searchParams.get('riderId');

    if (postId != null && postId.length != 0){
        const allRequest = await prisma.RiderRequest.findMany({
          where: {
            postId: {
              equals: parseInt(postId)
            }
          }
        });
        return NextResponse.json(allRequest);
      }

      if (riderId != null && riderId.length != 0){
        const allRiderRequest = await prisma.RiderRequest.findMany({
          where: {
            riderId: {
              equals: loggedInData.user?.id
            }
          }
        });
        return NextResponse.json(allRiderRequest);
      }
  
    const post = await prisma.RiderRequest.findMany({
        where: {
            riderId: {
              equals: loggedInData.user?.id
            }
          }
    });
  
    return NextResponse.json(id);
  }