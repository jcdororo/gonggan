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
import HotPlace from "./components/MainPage/HotPlace";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import Link from "next/link";
import SurroundingsSwiper from "./components/SurroundingsSwiper";
import Footer from "./components/Footer";
import ReviewMain from "./components/MainPage/ReviewMain";

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
      <div className="relative h-screen md:space-y-16">
        {/* Search Bar */}
        <div
          className="relative bg-white -mt-8 pt-8 darkMode z-[1]
        xs:scale-x-[35%] xs:scale-y-[40%] xs:fixed xs:top-0 xs:z-9999 xs:-translate-x-[10.3rem] xs:-translate-y-[1px]
        md:scale-100 md:relative md:z-0 md:translate-x-0 md:translate-y-0"
        >
          <SearchBar />
        </div>

        <div className="bg-white pt-1 darkMode">
          <div className="md:mx-12">
            <div className="flex flex-col md:gap-16 md:flex-row">
              <div className="w-[90%] mb-8 md:w-3/5 z-0">
                <Map />
                <Marker places={places} />
                <CurrentPlaceBox />
              </div>
              <div className="w-[90%] mx-auto md:w-2/5">
                <Space category="주변" places={places} />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex justify-center cursor-pointer animate-bounce">
            <Link href="#hot">
              <MdOutlineKeyboardDoubleArrowDown size="30" color="gray" />
            </Link>
          </div>
        </div>
      </div>

      {/* 핫한공간 */}
      <div id="hot">
        <HotPlace />
      </div>
      {/* <HotPlace /> */}
      {/* 내 집 근처에서 편하게 공부할 수 있는 공간. */}
      <MainInfo1 />
      <ReviewMain />

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
