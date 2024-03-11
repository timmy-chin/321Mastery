import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";


export async function GET(request) {
    const loggedInData = await checkLoggedIn();
    const searchParams = request.nextUrl.searchParams
    const ID = searchParams.get('userid');

    if (ID == "getID"){
        return NextResponse.json(loggedInData.user?.id)
    }
  
    const allPost = await prisma.User.findMany({
      where: {
          id: {
              equals: parseInt(ID)
          }
      }
    });
    return NextResponse.json(allPost);
}

