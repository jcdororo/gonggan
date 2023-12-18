import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  console.log(JSON.parse(request.body).nickname)
  if(request.method == 'POST') {
    try {
      // const db = (await connectDB).db("gonggan");
      // const result = await db.collection('users').find({}).toArray();
      
    } catch (error) {
      throw new Error('nickname check fail')
    }
  }

  

}