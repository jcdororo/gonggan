import { Roboto } from "next/font/google";
import SearchBar from "./components/SearchBar";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import DetailModal from "./detail/DetailModal";
import HotPlace from "./components/HotPlace";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Home() {
  // const db = (await connectDB).db("gonggan");
  // let result = await db.collection('like_place').find().toArray();
 

  return (
    <div className={`${roboto.className} h-screen`}>
      {/* Search Bar */}
      <SearchBar />

      {/* 핫한공간 */}
      <HotPlace />
       
    </div>
  );
}
