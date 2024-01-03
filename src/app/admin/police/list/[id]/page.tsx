import { connectDB } from "@/util/database";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const db = (await connectDB).db("gonggan");
  const result = await db.collection("police").findOne({ placeid: params.id });

  return (
    <div>
      <div className="text-center font-extrabold text-2xl my-4">신고 내용</div>
      <div className="mx-auto max-w-screen-sm p-5 mt-5 bg-sygnature-beige flex flex-col gap-4">
        <div className="font-bold">장소</div>
        <div>
          <Link href={`/places/${params.id}`} className="hover:underline">
            {result?.placename}
          </Link>
        </div>
        <div className="font-bold">신고자</div>
        <div>{result?.reporter}</div>
        <div className="font-bold">대상자</div>
        <div>{result?.writerid}</div>
        <div className="font-bold">대상자 닉네임</div>
        <div>{result?.writernickname}</div>
        <div className="font-bold">분류</div>
        {result?.check.map((x: string[], i: number) => (
          <div key={i}> - {x}</div>
        ))}
        <div className="font-bold">내용</div>
        <div>{result?.policeContent}</div>
      </div>
    </div>
  );
};

export default page;
