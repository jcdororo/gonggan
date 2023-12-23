import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from '@/util/database';

export default async function POST(request: any, response: any) {
  
  const data = request.body;
  const { email, title, content } = data;

  const db = (await connectDB).db("gonggan");

  try {
    const contact = await db.collection("contact").insertOne({
      email,
      title,
      content
    });
  
    response.status(200).json("success");
  } catch (error: any) {
    response.status(500).json("fail");

  }
}
