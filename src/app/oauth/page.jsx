import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import { connectDB } from "@/util/database";


export default async function SignUpForm() {
  let session = await getServerSession(authOptions);

  const db = (await connectDB).db("gonggan");
  let result = await db.collection('users').findOne({name : session.user.name})

  console.log('result',result)
  console.log('session@@@@@@@@@@@@@@@',session)


  return (
    <div className="mx-auto max-w-2xl p-5">
      <form action="/api/post/oauth" method="POST" className="m-auto p-11">
        <h1 className="text-3xl font-bold text-center">회원가입</h1>

        <div className="form__block">
          <label className="lab" htmlFor="id">
            이메일<span className="text-red-900 font-bold">*</span>
          </label>
          <input className="in" type="id" name="id" id="id" required />
        </div>
        <div className="form__block">

          <label className="lab" htmlFor="nickname">
            닉네임<span className="text-red-900 font-bold">*</span>
          </label>
          <input
            className="in"
            type="text"
            name="nickname"
            id="nickname"
            required
          />
        </div>
        <div className="form_block">
        </div>
        <div className="form_block flex">
          <input
            type="checkbox"
            name="xxx"
            id='checked'
            className="w-5 h-5 mt-5 mr-2 accent-yellow-900"
          />
          <p className="mt-5">댓글 및 공(工)간의 정보 알림 받기</p>
        </div>
        <div className="form__block">
          <input type="submit" value="가입완료" className="form__btn--submit" />
        </div>
      </form>
    </div>
  );
}
