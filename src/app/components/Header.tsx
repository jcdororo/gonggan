import Image from "next/image";
import header from '/public/logo2.png'
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth"
import HeaderInfo from "./HeaderInfo";
import Link from 'next/link'


interface Session {
  user: {
    name?: string,
    email?: string,
    image?: string,
    nickname: string,
    id: string
  }
}

export default async function Header() {
  let session:Session | undefined | null = await getServerSession(authOptions)

  
  return (
    <div>
      <div className="flex w-full h-20 bg-sygnature-brown fixed opacity-90">
      <Link href={'/'}>
        <Image 
          className="mx-1 ml-3 relative"
          src={header}
          width={110}
          height={75}
          alt="header"
        />
      </Link>
      <HeaderInfo session={session} />
        
        
      </div>
      <div className="h-20"></div>
    </div>
  )
}

