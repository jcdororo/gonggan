import { Roboto } from "next/font/google";
import SearchBar from "./components/SearchBar";
import Map from "./components/Map";
import Space from "./components/Space";
import Marker from "./components/Markers";
import { PlaceType } from "./interface";
import axios from "axios";
import CurrentPlaceBox from "./components/CurrentPlaceBox";
import MainInfo1 from "./components/MainInfo1";
import MainInfo3 from "./components/MainInfo3";
import Main from "./components/MainPage/Main";
import HotPlace from "./components/MainPage/HotPlace";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Link from "next/link";
import SurroundingsSwiper from "./components/SurroundingsSwiper";
import Footer from "./components/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Home() {
  // const db = (await connectDB).db("gonggan");
  // let result = await db.collection('like_place').find().toArray();

  const places: PlaceType[] = await getData();

  return (
    <div className={`${roboto.className}`}>
      {/* Search Bar */}
      <div className="h-screen space-y-24">
        <div className="bg-white -mt-8 pt-8 darkMode 
        xs:scale-[55%] 
        md:scale-100"
        >
          <SearchBar />
        </div>
        <div className="bg-white pt-1 z-10 darkMode">
          <div className="mx-12">
            <div className="flex gap-16 
            sm:flex-col 
            md:flex-row"
            >
              <div className="w-3/5">
                <Map />
                <Marker places={places} />
                <CurrentPlaceBox />
              </div>
              <div className="w-2/5">
                <Space category="주변" places={places} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center cursor-pointer animate-bounce">
          <Link href="#hot">
            <MdOutlineKeyboardDoubleArrowDown size="30" color="gray" />
          </Link>
        </div>
      </div>

      {/* 핫한공간 */}
      <div id="hot">
        <HotPlace />
      </div>
      {/* <HotPlace /> */}
      {/* 내 집 근처에서 편하게 공부할 수 있는 공간. */}
      <MainInfo1 />
      <Main />

      {/* 스터디 장소를 공유할 수 있어요. */}
      <MainInfo3 />
      <Footer />
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
