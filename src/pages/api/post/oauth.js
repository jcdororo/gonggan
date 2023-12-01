import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";



export default async function handler(request, response) {
  let session = await getServerSession(request, response, authOptions);

  console.log('session@@@',session)

  if(request.method == 'POST') {
    const db = (await connectDB).db("gonggan");
    let result = await db.collection('users').findOne({name : session.user.name})

    let temp = {...result,nickname : '', }

    
  }
}