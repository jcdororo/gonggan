import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  // if(request.method == 'GET')
  const db = (await connectDB).db("gonggan");
  let result = await db.collection('place').find({ location: { $regex: request.query.query, $options: 'i' } }).toArray();
  
  response.status(200).json(result);

  // return result


}