import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {

  if(request.method == 'PUT') {
    try {
      const body = JSON.parse(request.body);
      console.log('body',body)    
      const db = (await connectDB).db("gonggan");
      const result = await db.collection('users').updateOne(
        {id : body.id},
        {$set : body}
      )
      if(result) {
        response.status(200).json('update success')
      } else {
        response.status(500).json('update failed')
      }
      
    } catch (error) {
      throw new Error('update failed')
    }

    

  }

}