import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method == "POST") {
    const { session, email, nickname, alarm } = request.body;

    const db = (await connectDB).db("gonggan");

    const user = await db
      .collection("users")
      .findOne({ name: session.user.name });

    // 세션 정보와 Oauth 정보를 합쳐 db 업데이트 하기 위한 정보 생성
    const dbColumn = {
      ...user,
      ...session.user,
      nickname: "",
      password: "",
      alarm: false,
      role: "",
      method: "oauth",
    };
    
    await db
      .collection("users")
      .updateOne({ _id: new ObjectId(dbColumn._id) }, { $set: dbColumn });

    const update = {
      email: email,
      nickname: nickname,
      alarm: alarm,
      role: "user",
    };
    
    console.log("update", update)

    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(dbColumn._id) }, { $set: update });

    if (result) {
      response.redirect(301, "/");
    } else {
      response.status(500).json("카카오 로그인 실패");
    }
  }
}
