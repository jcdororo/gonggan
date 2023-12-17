// 아이디, 닉네임 중복 검사 요청
import { connectDB } from "@/util/database";

export default async function POST(request: any, response: any) {
  const db = (await connectDB).db("gonggan");

  const { loginId, nickname } = request.body;
  let checkExisting;

  if(loginId != undefined) {
    checkExisting = await db.collection("users").findOne({ loginId });
  }

  if(nickname != undefined) {
    checkExisting = await db.collection("users").findOne({ nickname });
  }

  if (checkExisting) {
    response.status(200).json("duplication");
  } else {
    response.status(200).json("no");
  }
  
}
