import { Roboto } from "next/font/google";
import SearchBar from "./components/SearchBar";
import HotPlace from "./components/HotPlace";
import Map from "./components/Map";

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
      <div className="p-20">
        <div className="flex gap-10">
          <div className="w-2/3"><Map /></div>
          <div className="w-1/3">주변공간</div>
        </div>
      {/* 핫한공간 */}
      <HotPlace />
      </div>
    </div>
  );
}
