"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiNotePencilBold } from "react-icons/pi";

export default function ReviewMain() {
  // 스크롤
  const [scrollVisible, setScrollVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 2500);
      console.log(window.scrollY);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="mt-12">
        <div className="mb-12 text-center">
          <div className="flex justify-center animate-bounce mb-4">
            <PiNotePencilBold size="30" />
          </div>
          <p className="font-bold text-3xl">사용자가 제공하는 공간의 정보와</p>
          <p className="font-bold text-3xl">사용후기들을 확인해보세요 !</p>
        </div>
        <div className="flex">
          <div className={`image-container ${scrollVisible ? "test_obj" : ""} left-10 z-10`}>
            <Image
              src="/images/mainpage/review1.png"
              width={400}
              height={600}
              alt="리뷰 이미지"
            />
          </div>
          <div className={`image-container ${scrollVisible ? "test_obj2" : ""} right-10`}>
            <Image
              src="/images/mainpage/review2.png"
              width={400}
              height={600}
              alt="리뷰 이미지"
            />
          </div>
        </div>
      </div>
    </>
  );
}
