import Image from "next/image";
import header from '/public/logo2.png'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import HeaderInfo from "./HeaderInfo";
import Link from 'next/link'
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { AlarmType } from "../interface";


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
  const session: any = await getServerSession(authOptions)

  const db = (await connectDB).db("gonggan");
  const alarms = await db.collection('alarm').find({receiver: new ObjectId(session.user.id)}).toArray();
  for(let alarm of alarms) {
    alarm._id = alarm._id.toString()
    alarm.receiver = alarm.receiver.toString();
  }


  
  return (
    <div>
      <div className="flex w-full h-20 bg-sygnature-brown fixed opacity-80 z-9999">
      <Link href={'/'}>
        <Image 
          className="mx-1 ml-3 relative"
          src={header}
          width={110}
          height={75}
          alt="header"
        />
      </Link>
      
      <HeaderInfo session={session} alarms={alarms} />
        
        
      </div>
      <div className="h-20"></div>
    </div>
  )
}

