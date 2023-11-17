"use client";
import Link from "next/link";

export default function SignInForm() {
  return (
    <div className="mx-auto max-w-2xl p-5">
      <form action="/post" method="POST" className="form__margin m-auto p-11">
        <h1 className="text-3xl font-bold text-center p-10">로그인</h1>
        <div className="form__block">
          <label className="lab" htmlFor="id">아이디</label>
          <input className="in" type="id" name="id" id="id" required />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="password">비밀번호</label>
          <input className="in" type="password" name="password" id="password" required />
        </div>
        <div className="form_block flex">
          <input
            type="checkbox"
            name="xxx"
            value="yyy"
            checked
            className="w-5 h-5 mt-5 mr-2 accent-yellow-900"
          />
          <p className="mt-5">로그인 상태 유지</p>
        </div>
        <div className="form__block">
          <input type="submit" value="로그인" className="form__btn--submit" />
        </div>
      </form>
      <div className="inline-flex px-11 w-full justify-center text-sm">
        <Link href='/'><p className="mr-2">아이디 및 비밀번호 찾기</p></Link>
        <p className="mr-2">|</p>
        <Link href='/'><p className="">회원가입</p></Link>
      </div>
      <div className="mt-5 w-full m-auto p-10">
        <input
          type="submit"
          value="N  네이버로 시작하기"
          className="bg-green-500 border-inherit text-white w-full"
        />
      </div>
    </div>
  );
}
