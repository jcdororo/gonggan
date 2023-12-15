import {connectDB} from '@/util/database'
import MyContents from './MyContents';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Image from 'next/image';
import { ObjectId, WithId } from 'mongodb';
import Link from 'next/link';
import { ReviewType } from '../interface';



export interface Place {
  _id?: string;
  location?: string;
  openhour?: string | null;
  closehour?: string | null;
  businessday?: string[] | null;
  phone?: string | null;
  howtouse?: string | null;
  desc?: string | null;
  address_name?: string | null;
  category_group_code?: string | null;
  category_group_name?: string | null;
  category_name?: string | null;
  id?: string | null;
  place_name?: string | null;
  place_url?: string | null;
  road_address_name?: string | null;
  x?: string | null;
  y?: string | null;
  status?: string | null;
}

export default async function MyPage() {
  const session: any = await getServerSession(authOptions);
  console.log('session',session)

  let likePlace = [];
  const placeReview: ReviewType[] = [];
  if(
      session.user.id && 
      session.user.name && 
      session.user.image && 
      session.user.nickname
    ) {
      const db = (await connectDB).db('gonggan');
      const result = await db.collection('like_place').find({liked_user:new ObjectId(session.user.id)}).toArray()
      likePlace = [];
      const user = await db.collection('users').findOne({_id:new ObjectId(session.user.id)})
      for(let i = 0; i < result.length; i++) {
        const response = await db.collection('place').findOne({_id: new ObjectId(result[i].place_id)}) as WithId<Place> | null;
        if(response) {
          response._id = response._id.toString()
          likePlace.push(response)
        }
      }

      const placeReview: any = await db.collection('review').find({writerid:new ObjectId(session.user.id)}).toArray()
      for(let i = 0; i < placeReview.length; i++) {
        placeReview[i]._id = placeReview[i]._id.toString();
        placeReview[i].placeid = placeReview[i].placeid.toString();
        placeReview[i].writerid = placeReview[i].writerid.toString();
      }
  }

  

  

  return(
    <div>
      <div className='text-center font-extrabold text-2xl my-4'>마이페이지</div>
      <div className='flex justify-center mt-4 mb-14'>
        <div className='flex justify-center items-center'>
          {/* <div className='bg-black w-20 h-20 mx-3 mt-4 rounded-full'></div> */}
          <Image 
            className='bg-black w-20 h-20 mx-3 mt-4 rounded-full'
            src={`${session.user.image ? session.user.image : '/logo2.png'}`}
            width={110}
            height={75}
            alt="header"
          />
        </div>
        <div>
          <div className='my-4 mx-1 font-medium text-xl'>
            <span className=''>[{`${session.user.nickname ? session.user.nickname : '닉네임설정'}`}]</span>{" "}<span className='text' style={{ color: '#998373' }}>님</span>
          </div>
          <div className='flex'>
            <Link className='w-32 h-8 font-bold mx-1 text-xs text-white bg-sygnature-brown border rounded-md flex flex-col text-center justify-center' href={'/contact'}>문의 하기</Link>
            <Link className='w-32 h-8 font-bold mx-1 text-xs text-white bg-sygnature-brown border rounded-md flex flex-col text-center justify-center' href={'/mypage/profile'}>프로필 설정</Link></div>
          </div>
      </div>
     
      <MyContents likePlace={likePlace} placeReview={placeReview} />
      
    </div>
  )
}