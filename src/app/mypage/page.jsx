import {connectDB} from '@/util/database'

export default async function MyPage() {
  let db = (await connectDB).db('gonggan');
  let result = await db.collection('user').find().toArray();

  console.log('result',result)
  

  return(
    <div>
      마이페이지
    </div>
  )
}