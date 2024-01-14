import React from 'react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { FaHandPointLeft } from 'react-icons/fa'
import Info3 from './Main/Info3'

const inter = Inter({ subsets: ['latin'] })


const MainInfo3 = () => {
  return (
    <div className={`h-[100vh] ${inter.className} relative z-10 bg-[url('/main/studycafe3.jpg')] bg-no-repeat bg-fixed bg-contain bg-center sm:bg-cover bg-white flex justify-center opacity-90 overflow-hidden`}>
      <div className=''>
        {/* 스터디 장소를 제안할 수 있어요 */}
        <div className='mt-8'>
          <span className='text-4xl font-bold text-white'>스터디 장소를 제안할 수 있어요.</span>
        </div>
        <Info3 />
        
      </div>
    </div>
  )
}

export default MainInfo3