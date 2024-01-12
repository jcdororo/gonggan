import Image from "next/image";
import {
  IoArrowForwardCircleOutline,
  IoArrowBackCircleOutline,
} from "react-icons/io5";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export default function ReviewMain() {
  return (
    <>
      <div className="">
        <div className="text-center">
          <p className="pb-4 font-bold text-3xl">
            사용자의 공간의 정보와 사용 후기들을 확인해보세요
          </p>
          <p className="pb-8 text-sm">
            사용자가 직접 남긴 공간 정보와 리뷰들을 제공합니다.
          </p>
        </div>
        <div className="flex justify-center p-8">
          <div className="flex items-center p-8">
            <MdOutlineArrowBackIos size="35" />
          </div>
          <Image
            src="/images/mainpage/review1.png"
            width={400}
            height={400}
            alt="리뷰 이미지"
          />
          <div className="flex items-center p-8">
            <MdOutlineArrowForwardIos size="35" />
          </div>
        </div>
      </div>
    </>
  );
}
