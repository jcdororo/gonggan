import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function post(request: any, response: any) {
  const { reviewId, nickname } = request.query;
  // const { reviewId, nickname } = request.body;
  console.log(request.body)

  try {
    const db = (await connectDB).db("gonggan");
    const user = await db.collection("users").findOne({ nickname });

    await db
      .collection("like_review")
      .insertOne({ review_id: new ObjectId(reviewId), liked_user: new ObjectId(user?._id) });

    response.status(200).json(true);
  } catch (error) {
    response.status(500).json("error");
  }
}
