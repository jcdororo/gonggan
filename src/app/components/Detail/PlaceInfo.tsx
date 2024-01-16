import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useQuery } from "react-query";
import { PlaceType } from "../../interface";
import Image from "next/image";
import PlaceLike from "./PlaceLike";

interface PlaceProps {
  _id: string;
}

export default function PlaceInfo({ _id }: PlaceProps) {
  const getPlace = async () => {
    const { data } = await axios.get(`/api/place/route?_id=${_id}`);
    return data as PlaceType;
  };

  const { data: place } = useQuery<PlaceType>(`place-${_id}`, getPlace, {
    enabled: !!_id,
    refetchOnWindowFocus: false,
  });

  console.log(place);
  const [pictureUrl, setPictureUrl] = useState();

  useEffect(() => {
    const getPlace = async () => {
      const { data } = await axios.get(`/api/place/getPicture?_id=${_id}`);
      setPictureUrl(data.url);
    };
    getPlace();
  }, []);

  return (
    <>
      <div className="relative top-[-42px] w-full h-[350px] bg-gray-500 overflow-hidden">
        {pictureUrl && (
          <Image
            src={pictureUrl}
            layout={"fill"}
            objectFit="cover"
            alt="장소 이미지"
          />
        )}
      </div>
      <div className="flex justify-between mb-10">
        <div className="flex px-8 text-2xl font-bold">{place?.place_name}</div>
        <div className="flex items-center pr-10">
          <PlaceLike _id={_id} />
        </div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <FaMapMarkerAlt size="24" />
        <div className="">{place?.road_address_name}</div>
      </div>
      <div className="flex gap-2 px-8 pb-5">
        <IoMdTime size="24" />
        <div>
          <div className="">
            {place?.businessday?.map(String).join(", ")} &nbsp;
            {place?.openhour} ~ {place?.closehour}
          </div>
        </div>
      </div>
    </>
  );
}
