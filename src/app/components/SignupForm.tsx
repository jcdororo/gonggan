'use client'
import { Link } from 'react-router-dom';

export default function SignupForm() {
  return (
    <form action="/post" method="POST" className="m-auto m-0 max-w-680 p-10">
      <h1 className='text-3xl font-bold text-center p-10'>회원가입</h1>
      <div className="form__block">
        <label htmlFor="id">아이디</label>
        <input type="id" name="id" id="id" required />
      </div>
      <div className="form__block">
        <label htmlFor="nickname">닉네임</label>
        <input type="nickname" name="nickname" id="nickname" required />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input type="password_confirm" name="password_confirm" id="password_confirm" required />
      </div>
      <div className="form_block">
        <p className='mt-5'>입력한 암호가 일치하지 않습니다.</p>
      </div>
      <div className="form_block">
        <p className='mt-5'>캡챠</p>
      </div>
      <div className="form_block flex">
        <input type="checkbox" name="xxx" value="yyy" checked className='w-5 h-5 mt-5 mr-2 accent-yellow-900' />
        <p className='mt-5'>댓글 및 공(工)간의 정보 알림 받기</p>
      </div>
      <div className="form__block">
        <input type="submit" value="가입완료" className="form__btn--submit" />
      </div>
    </form>
  );
}