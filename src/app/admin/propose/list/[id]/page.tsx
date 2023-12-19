'use client'
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";
import { inputHoverFocus } from "@/app/styles/styles";
import { FaFlag } from "react-icons/fa";
import { useSendAlarm } from "@/app/hooks/useSendAlarm";
<<<<<<< HEAD
=======
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { mapState } from "@/app/atom";
import Map from "@/app/components/Map";
>>>>>>> develop


interface Result {
  _id?: string,
  address_name : string,
  category_group_code : string,
  category_group_name : string,
  category_name : string,
  distance : string,
  id : string,
  phone : string,
  place_name : string,
  place_url : string,
  road_address_name : string,
  x : string,
  y : string,
}

interface Props {
  params: {
    id: string
  },
  searchParams: {
    _id: string
  }
}



const Propose = (props:Props) => {
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [phoneValue, setPhoneValue] = useState('')
  const [howtouseValue, setHowtouseValue] = useState('')
  const [descValue, setdescValue] = useState('')
  const [results, setResults] = useState<Result[]>([]);
  const [placeInfo, setPlaceInfo] = useState<Result | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const [place, setPlace] = useState([]);
  const [confirm, setConfirm] = useState('approved')
  const [map, setMap] = useRecoilState(mapState);

  const [sun, setSun] = useState(false)
  const [mon, setMon] = useState(false)
  const [tue, setTue] = useState(false)
  const [wed, setWed] = useState(false)
  const [thu, setThu] = useState(false)
  const [fri, setFri] = useState(false)
  const [sat, setSat] = useState(false)


  useEffect(() => {
    const propose = fetch(`/api/propose/proposeSearch/?id=${props.params.id}`, { method: 'GET' })
    .then(r => r.json())
    .then(r => {
        setQuery(r.location),
        setPhoneValue(r.phone),
        setHowtouseValue(r.howtouse),
        setdescValue(r.desc),
        (r.businessday && r.businessday.indexOf('월') !== -1) ? setMon(true) : setMon(false),
        (r.businessday && r.businessday.indexOf('화') !== -1) ? setTue(true) : setTue(false),
        (r.businessday && r.businessday.indexOf('수') !== -1) ? setWed(true) : setWed(false),
        (r.businessday && r.businessday.indexOf('목') !== -1) ? setThu(true) : setThu(false),
        (r.businessday && r.businessday.indexOf('금') !== -1) ? setFri(true) : setFri(false),
        (r.businessday && r.businessday.indexOf('토') !== -1) ? setSat(true) : setSat(false),
        (r.businessday && r.businessday.indexOf('일') !== -1) ? setSun(true) : setSun(false),
        (setPlaceInfo(r))   
      }      
    )      
  }, [])

  useEffect(() => {
    if(placeInfo) {
      // 이동할 위도 경도 위치를 생성합니다 
      const moveLatLon = new window.kakao.maps.LatLng(placeInfo.y, placeInfo.x);      
      // 지도 중심을 이동 시킵니다
      map.setCenter(moveLatLon);
      const iwContent = `<div style="padding:10px;">${placeInfo.place_name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new window.kakao.maps.LatLng(placeInfo.y, placeInfo.x), //인포윈도우 표시 위치입니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
  
      // 인포윈도우를 생성하고 지도에 표시합니다
      const infowindow = new window.kakao.maps.InfoWindow({
          map: map, // 인포윈도우가 표시될 지도
          position : iwPosition, 
          content : iwContent,
          removable : iwRemoveable
      });
    }
    
  }, [placeInfo])
  
  
  


  useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
  
      // 클릭된 엘리먼트가 input 엘리먼트 혹은 그 자손인 경우에는
      // setFocus(false)를 호출하지 않음
      if (inputRef.current && inputRef.current.contains(target)) {
        return;
      }
  
      // 다른 곳을 클릭한 경우 setFocus(false) 호출
      
      setFocus(false);
    };
  
    // document에 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
  
    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // useEffect는 한 번만 실행되도록 빈 배열을 전달


  const handleSearch = async (searchQuery:string) => {
    try {
      // 검색어가 빈칸일땐 호출하지 않음
      if(query.length > 0) {
        if(!placeInfo) {
          setPlaceInfo(null)
        }        const datas = [];
        const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchQuery}`;
        
        const place = await fetch(`/api/place/placeSearch?query=${searchQuery}`, { method: 'GET' })
                                                                              .then(r => r.json())
                                                                              // .then(r => datas.push(...r))
                                                                              
        datas.push(...place)                  
        setPlace(place); 
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다');
        }
  
        const data = await response.json();
        datas.push(...data.documents)
        
        
        setResults(datas);
        if(!placeInfo) {
          setFocus(true)
        }
        
        
      }
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생:', error);
    }
  };

  // 검색 api 호출에 0.5초 딜레이를 줌
  const debouncedQuery = useDebounce(query, 500);
  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery])

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);    
    
  };

  const handlePhoneChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(e.target.value);        
  };

  const handleHowtouseChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setHowtouseValue(e.target.value);        
  };

  const handleDescChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setdescValue(e.target.value);        
  };

  const handleFocus = () => {
    setFocus(true);
  }

  const handleResultClick = (result:Result) => {
    // 클릭한 결과 정보를 출력
    setQuery(result.place_name)
    setPlaceInfo(result)
    setFocus(false);
    // 이동할 위도 경도 위치를 생성합니다 
    const moveLatLon = new window.kakao.maps.LatLng(result.y, result.x);      
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
    const iwContent = `<div style="padding:10px;">${result.place_name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new window.kakao.maps.LatLng(result.y, result.x), //인포윈도우 표시 위치입니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성하고 지도에 표시합니다
    const infowindow = new window.kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position : iwPosition, 
        content : iwContent,
        removable : iwRemoveable
    });
  };

  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(confirm == 'approved') {
      const content = `제안 해주신 장소 [${query}] 승인 되었습니다.`
      useSendAlarm(content,props.searchParams._id,'','user')
    }

    if(confirm == 'rejected') {
      const content = `제안 해주신 장소 [${query}] 반려 되었습니다.`
      useSendAlarm(content,props.searchParams._id,'','user')
    }
    // useSendAlarm()
  }

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setConfirm(e.target.value)
  }

  const checkForm = () => {
    let info = '';
    query ? '' : info += '[위치] '
    results.length ? '' : info += '[위치 선택] '
    howtouseValue ? '' : info += '[이용방법] '
    descValue ? '' : info += '[설명]'
    

    info ? info += ' 을 작성 해 주세요' : info = ''

    
    return info
  }



  


  




  return (
    <div>
      <div className='text-center font-extrabold text-2xl my-4'>Admin 장소 제안 내용</div>

      <form action="/api/propose/proposeConfirm" method="POST" className="mx-auto max-w-screen-sm p-5 mt-5">
        <div className="font-semibold">위치<span className="text-red-500 font-bold">*</span></div>
        <input 
          className="px-2 my-2 border-gray-300 w-full hover:outline-none hover:ring hover:ring-sygnature-brown focus:outline-none focus:ring focus:ring-sygnature-brown" 
          name="location" 
          onFocus={handleFocus} 
          value={query}
          onChange={handleChange}
          ref={inputRef} // ref를 추가하여 input 엘리먼트에 대한 참조를 설정
          autoComplete="off"
        />
        <div 
          className={`border absolute -translate-y-3 bg-white ${focus ? 'visible' : 'hidden'}`}
        >
          <ul>
            {
            results.map((result:Result,i) => (
              <li 
                className={`cursor-pointer p-1 m-1 hover:bg-gray-100 ${result._id? 'text-sygnature-brown': ''}`}
                key={i} 
                onClick={() => handleResultClick(result)}
              >
                {result._id?<FaFlag className='inline' />:''}
                <span className="font-bold"> {result.place_name}</span>
                <span> [{result.address_name}],</span>
                <span> [{result.road_address_name}]</span>
              </li>
            ))}
         </ul>
        </div>
        {/* 지도 */}
        <Map />

        <div className="font-semibold mt-2">영업시간<span className="text-red-500 font-bold">*</span></div>
        <div className="flex flex-row mt-2 mb-4 ">
          <select className="w-24 text-center border border-gray-300 rounded-md cursor-pointer" name="openhour">
            <option value="00:00">00 : 00</option>
            <option value="00:30">00 : 30</option>
            <option value="01:00">01 : 00</option>
            <option value="01:30">01 : 30</option>
            <option value="02:00">02 : 00</option>
            <option value="02:30">02 : 30</option>
            <option value="03:00">03 : 00</option>
            <option value="03:30">03 : 30</option>
            <option value="04:00">04 : 00</option>
            <option value="04:30">04 : 30</option>
            <option value="05:00">05 : 00</option>
            <option value="05:30">05 : 30</option>
            <option value="06:00">06 : 00</option>
            <option value="06:30">06 : 30</option>
            <option value="07:00">07 : 00</option>
            <option value="07:30">07 : 30</option>
            <option value="08:00">08 : 00</option>
            <option value="08:30">08 : 30</option>
            <option value="09:00">09 : 00</option>
            <option value="09:30">09 : 30</option>
            <option value="10:00">10 : 00</option>
            <option value="10:30">10 : 30</option>
            <option value="11:00">11 : 00</option>
            <option value="11:30">11 : 30</option>
            <option value="12:00">12 : 00</option>
            <option value="12:30">12 : 30</option>
            <option value="13:00">13 : 00</option>
            <option value="13:30">13 : 30</option>
            <option value="14:00">14 : 00</option>
            <option value="14:30">14 : 30</option>
            <option value="15:00">15 : 00</option>
            <option value="15:30">15 : 30</option>
            <option value="16:00">16 : 00</option>
            <option value="16:30">16 : 30</option>
            <option value="17:00">17 : 00</option>
            <option value="17:30">17 : 30</option>
            <option value="18:00">18 : 00</option>
            <option value="18:30">18 : 30</option>
            <option value="19:00">19 : 00</option>
            <option value="19:30">19 : 30</option>
            <option value="20:00">20 : 00</option>
            <option value="20:30">20 : 30</option>
            <option value="21:00">21 : 00</option>
            <option value="21:30">21 : 30</option>
            <option value="22:00">22 : 00</option>
            <option value="22:30">22 : 30</option>
            <option value="23:00">23 : 00</option>
            <option value="23:30">23 : 30</option>
            <option value="24:00">24 : 00</option>
          </select>
          <span className="flex items-center mx-4 font-bold text-lg"> ~ </span>
          <select className="w-24 text-center border border-gray-300 rounded-md cursor-pointer" name="closehour">
          <option value="00:00">00 : 00</option>
            <option value="00:30">00 : 30</option>
            <option value="01:00">01 : 00</option>
            <option value="01:30">01 : 30</option>
            <option value="02:00">02 : 00</option>
            <option value="02:30">02 : 30</option>
            <option value="03:00">03 : 00</option>
            <option value="03:30">03 : 30</option>
            <option value="04:00">04 : 00</option>
            <option value="04:30">04 : 30</option>
            <option value="05:00">05 : 00</option>
            <option value="05:30">05 : 30</option>
            <option value="06:00">06 : 00</option>
            <option value="06:30">06 : 30</option>
            <option value="07:00">07 : 00</option>
            <option value="07:30">07 : 30</option>
            <option value="08:00">08 : 00</option>
            <option value="08:30">08 : 30</option>
            <option value="09:00">09 : 00</option>
            <option value="09:30">09 : 30</option>
            <option value="10:00">10 : 00</option>
            <option value="10:30">10 : 30</option>
            <option value="11:00">11 : 00</option>
            <option value="11:30">11 : 30</option>
            <option value="12:00">12 : 00</option>
            <option value="12:30">12 : 30</option>
            <option value="13:00">13 : 00</option>
            <option value="13:30">13 : 30</option>
            <option value="14:00">14 : 00</option>
            <option value="14:30">14 : 30</option>
            <option value="15:00">15 : 00</option>
            <option value="15:30">15 : 30</option>
            <option value="16:00">16 : 00</option>
            <option value="16:30">16 : 30</option>
            <option value="17:00">17 : 00</option>
            <option value="17:30">17 : 30</option>
            <option value="18:00">18 : 00</option>
            <option value="18:30">18 : 30</option>
            <option value="19:00">19 : 00</option>
            <option value="19:30">19 : 30</option>
            <option value="20:00">20 : 00</option>
            <option value="20:30">20 : 30</option>
            <option value="21:00">21 : 00</option>
            <option value="21:30">21 : 30</option>
            <option value="22:00">22 : 00</option>
            <option value="22:30">22 : 30</option>
            <option value="23:00">23 : 00</option>
            <option value="23:30">23 : 30</option>
            <option value="24:00">24 : 00</option>
          </select>
        </div>

        <div className="font-semibold">영업일</div>
        <div className="flex flex-row items-center justify-center my-2">
          <input name="businessday" readOnly={true} checked={mon} type="checkbox" value={'월'} className={`w-7 h-7 accent-sygnature-brown ml-4 cursor-pointer${inputHoverFocus}`} />
          <span className="ml-2 mr-8 block">월</span>
          <input name="businessday" readOnly={true} checked={tue} type="checkbox" value={'화'} className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`} />
          <span className="ml-2 mr-8 block">화</span>
          <input name="businessday" readOnly={true} checked={wed} type="checkbox" value={'수'} className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`} />
          <span className="ml-2 mr-8 block">수</span>
          <input name="businessday" readOnly={true} checked={thu} type="checkbox" value={'목'} className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`} />
          <span className="ml-2 mr-8 block">목</span>
          <input name="businessday" readOnly={true} checked={fri} type="checkbox" value={'금'} className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`} />
          <span className="ml-2 mr-8 block">금</span>
          <input name="businessday" readOnly={true} checked={sat} type="checkbox" value={'토'} className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`} />
          <span className="ml-2 mr-8 block">토</span>
          <input name="businessday" readOnly={true} checked={sun} type="checkbox" value={'일'} className={`w-7 h-7 accent-sygnature-brown cursor-pointer${inputHoverFocus}`} />
          <span className="ml-2 mr-4 block">일</span>
        </div>

        <div className="font-semibold mt-4 mb-2 w-full">전화번호<span className="ml-1 text-sm text-red-500">( - 없이, 생략가능)</span></div>
        <input 
          maxLength={20} 
          name="phone" 
          className={`px-2 border-gray-300 w-full ${inputHoverFocus}`} 
          onChange={handlePhoneChange}
          value={phoneValue}
          autoComplete="off"
        />

        <div className="font-semibold my-2">이용방법<span className="text-red-500 font-bold">*</span></div>
        <textarea 
          maxLength={500} 
          name="howtouse" 
          className={`p-2 h-40 border rounded-md border-gray-300 w-full resize-none ${inputHoverFocus}`} 
          onChange={handleHowtouseChange}
          value={howtouseValue}
          autoComplete="off"
        />

        <div className="font-semibold my-2">설명<span className="text-red-500 font-bold">*</span></div>
        <textarea 
          maxLength={500} 
          name="desc" 
          className={`p-2 h-40 border rounded-md border-gray-300 w-full resize-none ${inputHoverFocus}`} 
          onChange={handleDescChange}
          value={descValue}
          autoComplete="off"
        />   

        

        <div className="my-5 flex flex-row justify-center">
          {
            checkForm()
            ?
            checkForm()
            :
            <div className="flex gap-3">
            <select 
              className="w-24 text-center border border-gray-300 rounded-md cursor-pointer" 
              name="confirm"
              onChange={handleSelect}
            >
              <option value="approved">승인</option>      
              <option value="rejected">반려</option>      
            </select>       
            <button 
              className='w-64 h-16 font-bold mx-1 text-xl text-white bg-sygnature-brown border rounded-md flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300' 
              type="submit"
              onClick={handleClick}
            >
              완료
            </button>
              
            </div>              
            


          }
        </div>

        <div className="hidden">
            {placeInfo?.address_name && <input name="address_name" value={placeInfo?.address_name} onChange={()=>{}} />}
            {placeInfo?.category_group_code && <input name="category_group_code" value={placeInfo?.category_group_code} onChange={()=>{}} />}
            {placeInfo?.category_group_name && <input name="category_group_name" value={placeInfo?.category_group_name} onChange={()=>{}} />}
            {placeInfo?.category_name && <input name="category_name" value={placeInfo?.category_name} onChange={()=>{}} />}
            {placeInfo?.distance && <input name="distance" value={placeInfo?.distance} onChange={()=>{}} />}
            {placeInfo?.id && <input name="id" value={placeInfo?.id} onChange={()=>{}} />}
            {placeInfo?.phone && <input name="phone" value={placeInfo?.phone} onChange={()=>{}} />}
            {placeInfo?.place_name && <input name="place_name" value={placeInfo?.place_name} onChange={()=>{}} />}
            {placeInfo?.place_url && <input name="place_url" value={placeInfo?.place_url} onChange={()=>{}} />}
            {placeInfo?.road_address_name && <input name="road_address_name" value={placeInfo?.road_address_name} onChange={()=>{}} />}
            {placeInfo?.x && <input name="x" value={placeInfo?.x} onChange={()=>{}} />}
            {placeInfo?.y && <input name="y" value={placeInfo?.y} onChange={()=>{}} />}          
            {<input name="_id" value={props.params.id} onChange={()=>{}} />}
            
        </div>

        



      </form>



    </div>
  )
}

export default Propose