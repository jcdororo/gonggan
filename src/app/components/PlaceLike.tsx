"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery } from "react-query";

interface PlaceLikeProps {
  _id: string;
}

export default function PlaceLike({ _id }: PlaceLikeProps) {
  const { data: userData } = useSession();

  const [user, setUser] = useState(userData?.user);
  const [isLike, setIsLike] = useState<boolean>();
  const [like, setLike] = useState();

  useEffect(() => {
    const getLike = async () => {
      const { data } = await axios.get(`/api/place/getLike?place_id=${_id}`);
      setLike(data.length);
    };
    getLike();
  }, [isLike]);

  const getLikedUser = async () => {
    console.log("user", user?._id);
    const { data } = await axios.get(
      `/api/place/getLikedUser?place_id=${_id}&liked_user=${user?._id}`
    );

    if (data == "exist") {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  };

  const { data } = useQuery(``, getLikedUser);

  const onClick = async () => {
    try {
      console.log("isLike", isLike);
      if (isLike) {
        // 좋아요 삭제
        await axios.post(
          `/api/place/createLike?place_id=${_id}&liked_user=${user?._id}`
        );
        setIsLike(!isLike);
      } else {
        // 좋아요 생성
        const response = await axios.post(
          `/api/place/createLike?place_id=${_id}&liked_user=${user?._id}`
        );
        setIsLike(!isLike);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-2">
      <div onClick={onClick}>
        {isLike ? (
          <div className="cursor-pointer">
            <FaHeart size="25" color="red" />
          </div>
        ) : (
          <div className="cursor-pointer">
            <FaRegHeart size="25" />
          </div>
        )}
      </div>
      <div className="font-bold text-sm text-center flex items-center">{like}</div>
    </div>
  );
}
