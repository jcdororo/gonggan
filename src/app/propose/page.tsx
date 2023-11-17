import ModalPropose from "./ModalPropose";

export default function Propose() {
  return (
    <div>
      <div className='text-center font-extrabold text-2xl my-4'>장소 제안하기</div>

      <form className="my-12">
        <div className="font-semibold">위치</div>
        <input className="my-2" name="location" />

        <div className="font-semibold mt-2">영업시간</div>
        <div className="flex flex-row mt-2 mb-4">
          <input name="openhour" />
          <span className="flex items-center mx-4"> ~ </span>
          <input name="closehour" />
        </div>

        <div className="font-semibold">영업일</div>
        <div className="flex flex-row items-center justify-center my-2">
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown ml-4" />
          <span className="ml-2 mr-8 block">월</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">화</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">수</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">목</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">금</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-8 block">토</span>
          <input name="businessday_mon" type="checkbox" className="w-7 h-7 accent-sygnature-brown" />
          <span className="ml-2 mr-4 block">일</span>
        </div>

        <div className="font-semibold mt-4 mb-2">전화번호</div>
        <input name="phone" />

        <div className="font-semibold my-2">이용방법</div>
        <input name="howtouse" className="h-40" />

        <div className="font-semibold my-2">설명</div>
        <input name="desc" className="h-40" />
        


      </form>

      <ModalPropose />


    </div>
  )
}