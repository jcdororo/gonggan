import Image from "next/image";
import header from '/public/logo.png'

export default function Header() {
  return (
    <div className="h-20 bg-white relative">
      <Image 
        className="absolute m-1"
        src={header}
        width={110}
        height={75}
        alt="header"/>
    </div>
  )
}