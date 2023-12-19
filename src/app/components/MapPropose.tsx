"use client"

/*global kakao */
import Script from "next/script";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { locationState, mapProposeState, mapState } from "../atom"

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

export default function Map({ lat, lng, zoom }: MapProps) {
  const [map, setMap] = useRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    let map;
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(
          lat ?? location.lat,
          lng ?? location.lng
        ),
        level: zoom ?? location.zoom,
      };
      map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    })
    return map
  }
  
  const handleClick = () => {       
      // 이동할 위도 경도 위치를 생성합니다 
      const moveLatLon = new window.kakao.maps.LatLng(33.452613, 126.570888);
      
      // 지도 중심을 이동 시킵니다
      map.setCenter(moveLatLon);
    
  }
  
  return (
    <>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-[700px] rounded-lg"></div>
      <div onClick={handleClick}>지도이동 테스트</div>
    </>
  )
}