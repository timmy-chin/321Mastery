import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function POST(request) {
    const loggedInData = await checkLoggedIn();
    if (loggedInData.loggedIn) {
      const { driverId, rating } = await request.json();
      const rate = await prisma.Rating.create({
        data: {
          driverId: driverId,
          rating: rating
        }
      });
      return NextResponse.json(rate);
    }
    return NextResponse.json({error: 'not signed in'}, {status: 403});
  }


  export async function GET(request) {
    const loggedInData = await checkLoggedIn();
    const searchParams = request.nextUrl.searchParams
    const driverId = searchParams.get('driverId');

    if (driverId != null){
        const allRating = await prisma.Rating.findMany({
          where: {
            driverId: {
              equals: parseInt(driverId)
            }
          }
        });
        return NextResponse.json(allRating);
      }
  }