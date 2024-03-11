import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
  const loggedInData = await checkLoggedIn();
  const searchParams = request.nextUrl.searchParams
  const startLoc = searchParams.get('startLoc');
  const endLoc = searchParams.get('endLoc');
  const date = searchParams.get('date');
  const time = searchParams.get('time');
  const userId = searchParams.get('userId');

  if (userId != null){
    const driverPost = await prisma.Posting.findMany({
      where: {
        driverId: {
          equals: loggedInData.user?.id
        }
      }
    });
    return NextResponse.json(driverPost);
  }

  if ((startLoc == null || startLoc.length == 0) && (endLoc == null || endLoc.length == 0) && (date == null || date.length == 0) && (time == null || time.length == 0)){
    const allPost = await prisma.Posting.findMany({
      where: {
      }
    });
    return NextResponse.json(allPost);
  }



  const post = await prisma.Posting.findMany({
    where: {
      OR: [
    {
      startLoc: {
        equals: startLoc != null ? startLoc : " "
      },
    },
    {
      endLoc: {
        equals: endLoc != null ? endLoc : " "
      },
    },
    {
      time: {
        equals: time != null ? time : " "
      },
    },
    {
      date: {
        equals: date != null ? date : " "
      }
    }]

    }
  });

  return NextResponse.json(post);
}

export async function POST(request) {
  const loggedInData = await checkLoggedIn();
  if (loggedInData.loggedIn) {
    const { startLoc, endLoc, date, time, seats, price, driverName } = await request.json();
    const post = await prisma.Posting.create({
      data: {
        driverId: loggedInData.user?.id,
        startLoc: startLoc,
        endLoc: endLoc,
        date: date,
        time: time,
        seats: seats,
        price: price,
        driverName: driverName
      }
    });
    return NextResponse.json(post);
  }
  return NextResponse.json({error: 'not signed in'}, {status: 403});
}

