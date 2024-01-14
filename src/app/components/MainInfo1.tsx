import Image from 'next/image'
import React from 'react'
import { Inter } from 'next/font/google'
import { IoMdPin } from 'react-icons/io'
import { HiMapPin } from 'react-icons/hi2'

const inter = Inter({ subsets: ['latin'] })


const MainInfo1 = () => {
  return (
    <div className={`sm:h-[100vh] h-screen ${inter.className} relative z-0 bg-[url('/main/studycafe1.jpg')] bg-no-repeat bg-fixed bg-contain bg-center sm:bg-cover bg-white opacity-90`}>
      {/* 내 집 근처에서 편하게 공부할 수 있는 공간. */}
      <div className='absolute w-full text-center translate-y-12'>
        <span className='text-4xl font-extrabold text-white'>내 집 근처에서 편하게 공부할 수 있는 공간.</span>
      </div>
      <div className='absolute w-full text-center translate-y-28'>
        <span className='text-xl font-bold text-white'>지도에서 한눈에 찾아보세요 !</span>
      </div>
      {/* 지도사진 */}
      <div className='absolute w-full flex justify-center translate-y-44'>
          <Image 
            src={'/main/cafes.png'} 
            width={700}
            height={700}
            alt='cafes' 
          />    
          {/* 더카페 */}
          <div className='absolute scale-150 flex flex-col justify-center items-center gap-1 translate-y-24 translate-x-16'>
            <Image 
              src={'/main/thecaffe.jpg'}
              width={100}
              height={100}
              alt='thecaffe'
              className='border-2 rounded-lg border-sygnature-brown animate-[bounce_3s_ease-in-out_infinite]'
            />
            <HiMapPin className='scale-125 text-2xl text-sygnature-brown'/>
          </div> 
          {/* 스타벅스 */}
          <div className='absolute scale-150 flex flex-col justify-center items-center gap-1 -translate-x-40 translate-y-36'>
            <Image 
              src={'/main/starbucks.png'}
              width={70}
              height={70}
              alt='thecaffe'
              className='border-2 rounded-lg border-sygnature-brown animate-[bounce_4s_ease-in-out_infinite]'
            />
            <HiMapPin className='scale-125 text-2xl text-sygnature-brown'/>
          </div> 
          {/* 캐치카페 */}
          <div className='absolute scale-150 flex flex-col justify-center items-center gap-1 translate-x-60 translate-y-80'>
            <Image 
              src={'/main/catch.png'}
              width={60}
              height={60}
              alt='catch'
              className='border-2 rounded-lg border-sygnature-brown animate-[bounce_3.2s_ease-in-out_infinite]'
            />
            <IoMdPin className='scale-125 text-2xl text-sygnature-brown'/>
          </div> 
          {/* 도서관 */}
          <div className='absolute scale-150 flex flex-col justify-center items-center gap-1 -translate-x-20 translate-y-96'>
            <Image 
              src={'/main/library.png'}
              width={100}
              height={80}
              alt='library'
              className='border-2 rounded-lg border-sygnature-brown animate-[bounce_2.5s_ease-in-out_infinite]'
            />
            <IoMdPin className='scale-125 text-2xl text-sygnature-brown'/>
          </div> 
      </div>            
    </div>
  )
}

export default MainInfo1