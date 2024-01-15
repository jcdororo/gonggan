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

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default async function Home() {
  // const db = (await connectDB).db("gonggan");
  // let result = await db.collection('like_place').find().toArray();

  const places: PlaceType[] = await getData();

  return (
    <div className={`${roboto.className} `}>      
      {/* Search Bar */}
      <div className="bg-white -mt-8 pt-8 darkMode">
        <SearchBar />
      </div>
      <div className="bg-white pt-1 z-10 darkMode">
        <div className="m-12 h-screen">
          <div className="flex gap-10 sm:flex-col md:flex-row">
            <div className="w-3/5 h-vh">
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

      {/* 핫한공간 */}
      {/* <HotPlace /> */}
      {/* 내 집 근처에서 편하게 공부할 수 있는 공간. */}      
      <MainInfo1 />
      {/* 사용자의 공간의 정보와 사용 후기들을 확인해보세요 */}
      <Main />
      {/* 스터디 장소를 공유할 수 있어요. */}
      <MainInfo3 />
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
