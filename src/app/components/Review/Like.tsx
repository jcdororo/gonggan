"use client";
import { ReviewType } from "@/app/interface";
import axios from "axios";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";

interface LikeProps {
  review: ReviewType;
  nickname: string;
}

interface ReviewLikeProps {
  review_id: ObjectId;
  liked_user: ObjectId;
}

export default function Like({ review, nickname }: LikeProps) {
  const [countLike, setCountLike] = useState(review.like);
  const [like, setLike] = useState<ReviewLikeProps>();
  const [isLike, setIsLike] = useState<boolean>();

  useEffect(() => {
    const getLike = async () => {
      const { data } = await axios.get(
        `/api/review/getLike?nickname=${nickname}&reviewId=${review._id}`
      );
      setLike(data);
      setIsLike(
        like?.review_id.toString().includes(review._id.toString()) || false
      );
      console.log("use", isLike);
    };

    getLike();
  }, [review._id, isLike]);

  // 좋아요 수 변경 시
  useEffect(() => {
    const postLikeCount = async () => {
      await axios.post(`/api/review/updateReview`, {
        reviewid: review._id,
        like: countLike,
      });
    };
    postLikeCount();
  }, [countLike]);

  const onClick = async () => {
    try {
      if (isLike) {
        // 좋아요 삭제
        await axios.delete(
          `/api/review/deleteLike?reviewId=${review._id}&nickname=${nickname}`
        );
        setIsLike(!isLike);
        // 좋아요 수 -1
        setCountLike(countLike - 1);
      } else {
        // 좋아요 생성
        await axios.post(
          `/api/review/createLike?reviewId=${review._id}&nickname=${nickname}`
        );
        setIsLike(!isLike);
        // 좋아요 수 +1
        setCountLike(countLike + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <div onClick={onClick}>
          {like?.review_id == review._id ? (
            <div className="cursor-pointer">
              <BiSolidLike size="25" />
            </div>
          ) : (
            <div className="cursor-pointer">
              <BiLike size="25" />
            </div>
          )}
        </div>

        <div className="text-xs text-center mt-1">{countLike}</div>
      </div>
    </>
  );
}
