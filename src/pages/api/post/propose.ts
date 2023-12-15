import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  let session = await getServerSession(request, response, authOptions);



  request.body["proposerId"] = session?.user.id;
  if(request.method == 'POST') {
    try {
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('propose').insertOne(request.body)   
      if (result) {
        response.redirect(301,'/propose/complete')
        } else {
        response.status(500).json({ error: 'Propose failed' });
      }     
    } catch (error) {
      throw new Error('Propose failed')
    }
  }

}