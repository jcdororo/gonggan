import React from 'react'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })


const MainInfo3 = () => {
  return (
    <div className={`h-screen ${inter.className} relative z-10 bg-[url('/main/studycafe2.jpg')] bg-no-repeat bg-fixed bg-contain bg-center sm:bg-cover bg-white`}>
      <div className='absolute translate-y-44 sm:scale-75'>
        <Image
          src={'/main/noresult.png'} 
          width={600}
          height={450}
          alt='propose' 
          className='rounded-3xl'
        /> 
      </div>
      <div className='absolute right-0 sm:scale-75'>
        <Image
          src={'/main/propose2.png'} 
          width={600}
          height={450}
          alt='propose' 
          className='rounded-3xl'
        /> 
      </div>
    </div>
  )
}

export default MainInfo3