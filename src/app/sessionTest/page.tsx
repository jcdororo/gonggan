import { getServerSession } from "next-auth"
import { authOptions } from "@/pages/api/auth/[...nextauth].js"

export default async function SessionTest() {
  let session = await getServerSession(authOptions)
  console.log('session@@@@@@@',session)
  
  return (
    <div>
      세션테스트
    </div>
  )
}




