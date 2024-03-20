import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function POST(request) {
    const loggedInData = await checkLoggedIn();
    if (loggedInData.loggedIn) {
      const verify = await prisma.Verify.create({
        data: {
          userId: loggedInData.user?.id,
        }
      });
      return NextResponse.json(verify);
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }


  export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId');

    if (userId != null && userId.length != 0){
        const verify = await prisma.Verify.findMany({
          where: {
            userId: {
              equals: parseInt(userId)
            }
          }
        });
        return NextResponse.json(verify);
      }
  }