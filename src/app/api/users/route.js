import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import bcrypt from 'bcryptjs';
// import { PrismaClient }  from '@prisma/client';

// const prisma  = new PrismaClient()

export async function POST(request) {
  const data = await request.formData();
  const email = data.get('email');
  const password = data.get('password');
  const firstName = data.get('firstname');
  const lastName = data.get('lastname');
  const confirmation = data.get('confirmation');
  if (email && password && firstName && lastName && confirmation && confirmation == password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;
    try {
      user = await prisma.user.create({
        data: { email, password: hashedPassword, firstName, lastName }
      });
    } catch (e) {
      return NextResponse.json({error: e.message}, {status: 500 })
    }
    return NextResponse.json(user);
  }
  return NextResponse.json({ error: 'Email or Password not defined' }, { status: 500 });
}