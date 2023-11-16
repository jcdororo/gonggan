export default function Police() {


  return (
    <div className="flex flex-col justify-center items-center">
      <div className='text-center font-extrabold text-2xl my-4'>신고하기</div>
      <div className="my-8">
        <div className="font-bold">
          작성자
        </div>
        <div className="m-6">
          소시지
        </div>
        <div className="font-bold">
          내용
        </div>
        <div className="w-116 p-4 mx-6 mt-6 mb-8 font-semibold border-2 border-sygnature-brown rounded-md">
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. 
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. 
        </div>

        <label className="flex flex-col py-3 px-4">
          <div className="flex cursor-pointer">
            <input type="checkbox" className="accent-sygnature-brown w-7 h-7" />
            <span className="ml-2 text-lg font-semibold">부정적인 태도</span>
          </div>
        </label>

        <label className="flex flex-col py-3 px-4">
          <div className="flex cursor-pointer">
            <input type="checkbox" className="accent-sygnature-brown w-7 h-7" />
            <span className="ml-2 text-lg font-semibold">욕설</span>
          </div>
        </label>

        <label className="flex flex-col py-3 px-4">
          <div className="flex cursor-pointer">
            <input type="checkbox" className="accent-sygnature-brown w-7 h-7" />
            <span className="ml-2 text-lg font-semibold">올바르지 않은 정보</span>
          </div>
        </label>

        <label className="flex flex-col py-3 px-4">
          <div className="flex cursor-pointer">
            <input type="checkbox" className="accent-sygnature-brown w-7 h-7" />
            <span className="ml-2 text-lg font-semibold">혐오 발언</span>
          </div>
        </label>

        





        

        

        <div>
          신고하기
        </div>
      </div>
      
    </div>
  )
}