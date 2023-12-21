import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function get(request: any, response: any) {
  const { nickname, reviewId } = request.query;
  const db = (await connectDB).db("gonggan");

  try {
    const user = await db.collection("users").findOne({ nickname });
    const reviewLike = await db
      .collection("like_review")
      .findOne({
        review_id: new ObjectId(reviewId),
        liked_user: new ObjectId(user?._id),
      });

    response.status(200).json(reviewLike);
  } catch (error) {
    response.status(500).json("error");
  }
}
