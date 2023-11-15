'use client'

import React, {useState} from 'react'

const MyContents = () => {
  const [btnName, setBtnName] = useState('like')

  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (event):void => {
    event.currentTarget.textContent == '좋아요' ? setBtnName('like') : setBtnName('review')
  }


  return (
    <div>
      {/* 좋아요, 리뷰 버튼 */}
      <div className='flex flex-row justify-center text-2xl pt-10 pb-3 text-center'>
        <div 
          className={`p-4 cursor-pointer mx-4 w-52 border-b-2 ${btnName == 'like' ? ' border-black font-bold' : ''}`}
          onClick={handleClick}
        >좋아요</div>
        <div 
          className={`p-4 cursor-pointer mx-4 w-52 border-b-2 ${btnName == 'review' ? ' border-black font-bold' : ''}`}
          onClick={handleClick}
        >리뷰
        </div>
      </div>

      {/* 좋아요, 리뷰 버튼에 따른 컴포넌트 보여줌 */}
      {
        btnName == 'like'
        ?
        <div className='flex flex-col place-items-center justify-center'>

          <div className='flex flex-row relative border border-black rounded-md my-3'>
            <div className='font-extrabold my-3 mx-2 w-52'>
              캐치카페 서울대점
            </div>
            <div className='flex justify-end items-center font-bold w-56'>
              <div className='mx-5 text-3xl' style={{ color: '#998373' }}>♥</div>
            </div>
          </div>

        <div className='flex flex-row relative border border-black rounded-md my-3'>
          <div className='font-extrabold my-3 mx-2 w-52'>
            더 카페: 이네스트점
          </div>
          <div className='flex justify-end items-center font-bold w-56'>
            <div className='mx-5 text-3xl' style={{ color: '#998373' }}>♥</div>
          </div>
        </div>

      </div>
        :
        <div className='flex flex-col place-items-center justify-center'>
          <div className='bg-slate-400'>
            안녕하세요
          </div>

        </div>
      }
      
    </div>
  )
}

export default MyContents