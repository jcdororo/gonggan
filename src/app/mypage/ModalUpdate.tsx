'use client'
import React from 'react'


interface ModalProps {
  handleUpdate?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const ModalUpdate: React.FC<ModalProps> = ({handleUpdate}) => {
  return (
    <div>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
          <div className="bg-white py-4 px-5 mx-2 rounded-lg w-96 h-72">
            <div className='my-2 text-lg font-semibold'>
              캐치카페 서울대점
            </div>

            <div className='my-2 font-bold'>
              ★★★★☆ 4.5
            </div>

            <div className='flex flex-col border border-black rounded-md my-2 h-32 overflow-hidden p-1'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </div>

            <div className='flex items-center justify-center text-sm font-bold'>
              <div className='cursor-pointer px-8 py-1 m-3 border-2 border-sygnature-brown text-sygnature-brown rounded-md ' onClick={handleUpdate}>
                취소하기
              </div>
              <div className='cursor-pointer px-8 py-1 m-3 bg-sygnature-brown border border-sygnature-brown text-white rounded-md '>
                수정하기
              </div>
            </div>
          </div>
      </div>
    </div>  )
}

export default ModalUpdate