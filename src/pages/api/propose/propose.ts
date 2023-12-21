import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request:NextApiRequest, response:NextApiResponse) {
  let session = await getServerSession(request, response, authOptions);



  request.body["proposerId"] = session?.user.id;
  if(request.method == 'POST') {
    console.log(request.body)

    for(const img of request.body.image){
      console.log('img',img)

    
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`
      const formData = new FormData();

      formData.append('file', img as Blob);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
      

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json();
      return data.url
    }
    // try {
    //   const db = (await connectDB).db("gonggan");
    //   const result = await db.collection('propose').insertOne(request.body)   
    //   if (result) {
    //     response.redirect(301,'/propose/complete')
    //     } else {
    //     response.status(500).json({ error: 'Propose failed' });
    //   }     
    // } catch (error) {
    //   response.status(500).json({ error: error });
    // }
  }

}
