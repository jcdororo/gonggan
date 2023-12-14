"use client";
import { useRecoilValue } from "recoil";
import { PlaceType } from "../interface";
import { mapState } from "../atom";
import { useCallback, useEffect } from "react";

interface MarkerProps {
  places?: PlaceType[];
}

export default function Marker({ places }: MarkerProps) {
  const map = useRecoilValue(mapState);

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      // 식당 마커 띄우기
      places?.map((place) => {
        const imageSrc = "/images/markers/default.png", // 마커 이미지 주소
          imageSize = new window.kakao.maps.Size(40, 40), // 마커 이미지의 크기
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커 이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정

        // 마커 이미지 생성
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        // 마커가 표시될 위치
        const markerPosition = new window.kakao.maps.LatLng(
          place?.y,
          place?.x
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        })

        marker.setMap(map);
      });
    }
  }, [map, places]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
