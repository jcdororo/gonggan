import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {

  try{
    const db = (await connectDB).db("gonggan");
    let result = await db.collection('propose').findOne({_id: new ObjectId(request.query.id)})    
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: 'Propose search fail' });
    throw new Error('Propose search fail')
  }


}