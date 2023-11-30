import Image from "next/image";
import header from '/public/logo.png'
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth"

export default async function Header() {
  let session: any = await getServerSession(authOptions)
  console.log('session',session.user.image)
  return (
    <div className="h-20 bg-white fixed">
      <Image 
        className="m-1 relative"
        src={header}
        width={110}
        height={75}
        alt="header"
      />
      
      <div className="right-1">
        <Image 
          src={session.user.image}
          width={40}
          height={40}
          alt='아이콘'
        />
      </div>
    </div>
  )
}