"use client";

/*global kakao */
import Script from "next/script";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState, mapState } from "../atom";
import { memo } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export default memo(function Map({ lat, lng, zoom }: MapProps) {
  const [map, setMap] = useRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng
        ),
        level: zoom ?? location.zoom,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      setMap(map);
    });
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div
        id="map"
        className="h-[40vh] sm:h-[50vh] rounded-lg shadow-3xl translate-x-5 sm:translate-x-9 md:translate-x-5"
      ></div>
    </>
  );
});
