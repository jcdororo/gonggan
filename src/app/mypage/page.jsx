import {connectDB} from '@/util/database'
import MyContents from '../components/MyContents';

export default async function MyPage() {
  let db = (await connectDB).db('gonggan');
  let result = await db.collection('user').find().toArray();

  

  return(
    <div>
      <div className='text-center font-extrabold text-2xl my-4'>마이페이지</div>
      <div className='flex justify-center mt-4 mb-14'>
        <div className='flex justify-center items-center'>
          <div className='bg-black w-20 h-20 mx-3 mt-4 rounded-full'></div>
        </div>
        <div>
          <div className='my-4 mx-1 font-medium text-xl'>
            <span className=''>내미래보다선명하다</span>{" "}<span className='text-' style={{ color: '#998373' }}>님</span>
          </div>
          <button className='w-32 h-8 font-bold mx-1 text-xs'>문의 하기</button>
          <button className='w-32 h-8 font-bold mx-1 text-xs'>프로필 설정</button>
        </div>
      </div>
      <MyContents />
    </div>
  )
}