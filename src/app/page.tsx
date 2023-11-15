import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function Home() {
  return (
    <div className={roboto.className}>
      {/* <button >버튼</button>
      <input type='text' value='텍스트박스'></input> */}
    </div>
  )
}
