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
        <div className="w-116 p-4 m-6 font-semibold border-2 border-sygnature-brown rounded-md">
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. 
          Lorem Ipsum is simply dummy text of the printing and 
          typesetting industry. 
        </div>

        <div className="flex">
          <input className="text-red-500" type="checkbox"/>
          <div>
            부정적인태도
          </div>
        </div>

        <div>
          신고하기
        </div>
      </div>
      
    </div>
  )
}