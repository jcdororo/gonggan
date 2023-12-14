import { Roboto } from "next/font/google";
import SearchBar from "./components/SearchBar";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Map from "./components/Map";
import Space from "./components/Space";
import Marker from "./components/Markers";
import { PlaceType } from "./interface";
import axios from "axios";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Home() {
  // const db = (await connectDB).db("gonggan");
  // let result = await db.collection('like_place').find().toArray();

  const places: PlaceType[] = await getData();

  return (
    <div className={`${roboto.className} h-screen`}>
      {/* Search Bar */}
      <SearchBar />
      <div className="p-20">
        <div className="flex gap-10">
          <div className="w-2/3">
            <Map />
          </div>
          <Marker places={places} />
          <div className="w-1/3">
            <Space category="주변" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function getData() {
  try {
    const res = await axios.get("http://localhost:3000/api/places/route");
    const data = res.data;
    return data;
  } catch (e) {
    console.log(e);
  }
}
