import { connectDB } from '@/util/database';
import Like from './Like';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { ObjectId } from 'mongodb';


const LikeTest = async () => {
  let result= [];
  let likeResult = [];
  let session = await getServerSession(authOptions);

  try {
    const db = (await connectDB).db('gonggan')
    result = await db.collection('place').find().toArray();    
    for(let i = 0; i < result.length; i++) {
      const like = await db.collection('like_place').findOne({place_id:new ObjectId(result[i]._id),liked_user:new ObjectId(session.user.id)}); 
      like ? likeResult.push('true') : likeResult.push('false')  
    }
  } catch (error) {
    console.log('error',error)
  }
  console.log(session)
  return (
    <div>
      <Like result={result} likeResult={likeResult} liked_user={session.user.id} />
    </div>
  )
};

export default LikeTest;
