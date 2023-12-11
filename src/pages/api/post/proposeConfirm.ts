import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {


  
  if(request.method == 'POST') {
    try {
      let temp = { status : '완료'}
      const db = (await connectDB).db("gonggan");
      request.body.status = "완료"
      let result = await db.collection('place').insertOne(request.body) 
      let result2 = await db.collection('propose').updateOne(
          { _id : new ObjectId(request.body._id)},
          {$set : temp }
        )
      if (result) {
        response.redirect(301,'/admin/propose/list')
        } else {
        response.status(500).json({ error: 'Confirm failed' });
      }     
    } catch (error) {
      // throw new Error('Confirm failed')
      response.redirect(301,'/admin/propose/list')
    }
  }
}