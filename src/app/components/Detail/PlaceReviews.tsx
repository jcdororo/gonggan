import axios from "axios";
import { ReviewType } from "../../interface";
import { useQuery } from "react-query";
import { BiLike } from "react-icons/bi";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface PlaceProps {
  _id: string;
}

export default function PlaceReviews({ _id }: PlaceProps) {
  console.log("reviewid", _id);
  const getReviews = async () => {
    const { data } = await axios.get(`/api/reviews/findReviews?_id=${_id}`);
    return data as ReviewType[];
  };

  const {
    data: reviews,
    isFetching,
    isSuccess,
    isError,
  } = useQuery<ReviewType[]>(`review-${_id}`, getReviews, {
    enabled: !!_id,
    refetchOnWindowFocus: false,
  });

  const [limit, setLimit] = useState(5);

  const handleReadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  return (
    <>
      <div className="flex justify-between px-8 pt-10 pb-5 ">
        <div className="flex gap-3">
          <div className="text-3xl font-bold">리뷰</div>
          <div className="mt-3">리뷰 {reviews?.length}개</div>
        </div>
        <div className="m-2 pt-[6px] cursor-pointer">리뷰 작성하기</div>
      </div>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <>
            <div
              key={index}
              className="m-auto w-[89%] p-5 border border-solid border-black rounded-md mb-5"
            >
              <div className="flex justify-between mb-3">
                <div className="flex">
                  <div className="w-11 h-11 mr-5 bg-black rounded-full"></div>
                  <div className="flex items-center font-bold">
                    {review.writernickname}
                  </div>
                </div>
                <div className="">
                  <BiLike size="20" />
                  <div className="text-sm">15</div>
                </div>
              </div>
              <div className="mb-3">★★★★☆ 4.5</div>
              <div className="mb-3">{review.content}</div>
              <div className="flex justify-end">신고하기</div>
            </div>
          </>
        ))
      ) : (
        <div className="text-center p-10 first-letter:text-lg">작성된 리뷰가 없습니다.</div>
      )}
      <div className="flex justify-center pt-1 pb-5 cursor-pointer">
        {reviews && limit < reviews.length && (
          <div className="flex justify-center w-[150px] p-2 bg-black/10 rounded-2xl">
            <div onClick={handleReadMore}>리뷰 더 보기 &nbsp; </div>
            <div className="flex items-center">
              <IoIosArrowDown />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
