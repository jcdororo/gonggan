"use client"

/*global kakao */
import Script from "next/script";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState, mapState } from "../atom"
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
      setMap(map);
    })
  }
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="h-[700px] rounded-lg translate-x-7"></div>
    </>
  )
})