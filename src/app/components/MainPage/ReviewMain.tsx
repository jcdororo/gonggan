"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiNotePencilBold } from "react-icons/pi";

export default function ReviewMain() {
  // 스크롤
  const [scrollVisible, setScrollVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 1800);
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
      <div className="flex items-center justify-center h-screen p-4 sm:p-10 bg-sygnature-beige">
        <div className="flex-col">
          <div
            className={`mb-12 text-center ${
              scrollVisible ? "fade-in-box" : ""
            }`}
          >
            <div className="flex justify-center animate-bounce mb-4">
              <PiNotePencilBold size="30" />
            </div>
            <div className="font-bold text-xl sm:text-3xl">
              <p>
                사용자가 제공하는 <br className="block sm:hidden" />
                공간의 정보와
              </p>
              <p>사용후기들을 확인해보세요 !</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className={` ${
                scrollVisible ? "img-trans1" : ""
              } left-10`}
            >
              <Image
                src="/images/mainpage/review2.png"
                width={300}
                height={400}
                alt="리뷰 이미지"
              />
            </div>
            <div
              className={` ${
                scrollVisible ? "img-trans2" : ""
              } `}
            >
              <Image
                src="/images/mainpage/review1.png"
                width={300}
                height={400}
                alt="리뷰 이미지"
              />
            </div>
            <div
              className={` ${
                scrollVisible ? "img-trans3" : ""
              } right-10`}
            >
              <Image
                src="/images/mainpage/review3.png"
                width={300}
                height={400}
                alt="리뷰 이미지"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
