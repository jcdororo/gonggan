"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useQuery } from "react-query";
import axios from "axios";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaMapLocationDot } from "react-icons/fa6";

interface PlaceType {
  _id: ObjectId;
  place_id: string;
  url: string;
}

export default function HotPlace() {
  const router = useRouter();

  // 스크롤
  const [scrollVisible, setScrollVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 300);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getPlacePicture = async () => {
    const { data } = await axios.get(`/api/places/getHotPlaces`);
    return data as PlaceType[];
  };

  const { data: places } = useQuery(`hotPlaces`, getPlacePicture);
  // console.log(places);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  SwiperCore.use([Autoplay]);

  return (
    <>
      <div className="h-screen py-28 px-20 bg-gradient-to-t from-sygnature-brown">
        <div
          className={`swiper-container w-[100%] mx-auto transition-opacity duration-[2s] ${
            scrollVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mb-12 fade-in-box text-center">
            <div className="flex justify-center animate-bounce mb-4">
              <FaMapLocationDot size="30" />
            </div>
            <p className="font-bold text-3xl">실시간 사용자들에게 인기 있는</p>
            <p className="font-bold text-3xl">공간들을 둘러보세요 !</p>
          </div>
          <div className="h-[50vh]">
            <Swiper
              modules={[FreeMode, Navigation, Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              loop={true}
              spaceBetween={10} // 슬라이스 사이 간격
              slidesPerView={1} // 보여질 슬라이드 수
              navigation={true} // prev, next button
              centeredSlides={true} // 1번 슬라이드가 가운데 보이기
              autoplay={{ delay: 2000 }}
              className="mb-2 h-full"
            >
              {places?.map((place) => (
                <SwiperSlide key={place.place_id}>
                  <div className="w-full">
                    <Image
                      src={place.url || ""}
                      alt="장소 이미지"
                      layout={"fill"}
                      objectFit="cover"
                      className="rounded-md cursor-pointer"
                      onClick={() => router.push(`/places/${place.place_id}`)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {places?.map((place) => (
                <SwiperSlide className="rounded-md" key={place.place_id}>
                  <div className="w-[100px] h-[80px]">
                    <Image
                      src={place.url}
                      alt="장소 이미지"
                      layout={"fill"}
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
