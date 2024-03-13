import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function POST(request) {
    const loggedInData = await checkLoggedIn();
    if (loggedInData.loggedIn) {
      const { postId, status, riderIds } = await request.json();
      const driveStatus = await prisma.DriveStatus.create({
        data: {
          postId: postId,
          status: status,
          riderIds: riderIds
        }
      });
      return NextResponse.json(driveStatus);
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }

  export async function GET(request) {
    const loggedInData = await checkLoggedIn();
    const searchParams = request.nextUrl.searchParams
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (start != null && start.length != 0){
        const allStart = await prisma.DriveStatus.findMany({
          where: {
            status: {
              equals: "start"
            }
          }
        });
        return NextResponse.json(allStart);
      }
  
      if (end != null && end.length != 0){
        const allEnd = await prisma.DriveStatus.findMany({
          where: {
            status: {
              equals: "end"
            }
          }
        });
        return NextResponse.json(allEnd);
      }  
  }