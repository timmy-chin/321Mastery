import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { checkLoggedIn } from "@/lib/auth";

export async function GET(request) {
    const loggedInData = await checkLoggedIn();
    const userData = await prisma.user.findUnique({
    where: {
        id: loggedInData.user?.id
    }
    });
    return NextResponse.json(userData);
  }

export async function POST(request) {

}