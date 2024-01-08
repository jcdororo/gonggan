import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    try {
      const db = (await connectDB).db("gonggan");
      const body = JSON.parse(request.body);
      console.log("body", body);

      if (body.like != undefined) {
        // 좋아요만 수정
        const result = await db.collection("review").updateOne(
          {
            _id: new ObjectId(body.reviewid),
          },
          {
            $set: { like: body.like },
          }
        );
      } else {
        // 내용, 평점 수정
        const result = await db.collection("review").updateOne(
          {
            // placeid : new ObjectId(request.body.placeid),
            // writerid: new ObjectId(request.body.writerid)
            _id: new ObjectId(body.reviewid),
          },
          {
            $set: { content: body.newContent, star: body.star },
          }
        );
        console.log('result@@@',result)
      }


      response.status(200).json("success");
    } catch (error) {
      response.status(500).json({ error: error });
    }
  }
}
