import { connectDB } from "@/util/database";
import { Db, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  


  if(request.method == 'POST') {
    // console.log('request.body', request.query)
    try {
      let temp = {
        place_id: new ObjectId(request.query.place_id), 
        liked_user: new ObjectId(request.query.liked_user)
      }
      const db = (await connectDB).db("gonggan");
      
      if(request.query.isLike == 'true') {
        let result = await db.collection('like_place').deleteOne(temp)
        response.status(200).json('false')
      } 
  
      if(request.query.isLike == 'false') {
        let result = await db.collection('like_place').insertOne(temp)
        response.status(200).json('true')
      }
    } catch (error) {
      console.log('like error',error)
    }
    
    
    

    

    
    
  }
  }