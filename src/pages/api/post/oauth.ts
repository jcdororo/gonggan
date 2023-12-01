import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";



export default async function handler(request:NextApiRequest, response:NextApiResponse) {



  if(request.method == 'POST') {
    let temp = {...request.body};
    let update = {
          email : temp.email,
          nickname : temp.nickname,
          alarm : temp.alarm,
          role : "user"
       };

    const db = (await connectDB).db("gonggan");
    let result = await db.collection('users').updateOne(
      {_id : new ObjectId(temp._id)},
      {$set : update}
    )
    
  }
}