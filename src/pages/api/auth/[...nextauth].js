import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  secret : '1q2w3e4r',
  adapter : MongoDBAdapter(connectDB)
}

export default NextAuth(authOptions);