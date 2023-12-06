import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  console.log(request.query._id)
  if(request.method == 'DELETE') {
    try {
      const db = (await connectDB).db("gonggan");
      let result = await db.collection('review').deleteOne({_id : new ObjectId(request.query._id)})


      if (result) {
        response.redirect(301,'/mypage')
        } else {
        response.status(500).json({ error: 'Delete failed' });
      }     
    } catch (error) {
      console.log(error)
    }
  }
}
