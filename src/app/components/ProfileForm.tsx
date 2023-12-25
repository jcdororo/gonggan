"use client";
import { useEffect, useRef, useState } from "react";
import { FaToggleOn } from "react-icons/fa";
import Image from "next/image";
import { useInputImg } from "../hooks/useInputImg";
import { useUploadImg } from "../hooks/useUploadImg";
import { useRouter } from "next/navigation";

export default function ProfileForm({session}:any) {
  const [id, setId] = useState<string | ''>('')
  const [picture, setPicture] = useState<string | null>(null)
  const [nickname, setNickname] = useState('')
  const [newNickname, setNewNickname] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const imageRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null)
  const [checkVisable, setCheckVisable] = useState(false);
  const [infoVisable, setInfoVisable] = useState(false);
  const router = useRouter();



  useEffect(() => {
    setId(session.user.id)
    setPicture(session.user.image)
    setNickname(session.user.nickname)
    setNewNickname(session.user.nickname)
    setEmail(session.user.email)
    
  }, [])

  const handleCheck = async () => {
    if(nickname == '') return;
    setCheckVisable(true);
    try {
      const isExistNickname = await fetch('/api/auth/nicknameCheck', {method: 'POST', body:  JSON.stringify({nickname:nickname})}).then(r=>r.json())
      if(isExistNickname == 'N') {
        setNewNickname(nickname)
      } else {
        setNewNickname(null)
      }
      setInfoVisable(true)
    } catch (error) {
      throw new Error(error?.toString())
    }
  }

  const handleClick = () => {
    imageRef.current?.click();
  }

  const handleNickname = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    setCheckVisable(true)
    setNewNickname(null)

  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    useInputImg(e, setImage, setPicture);
  }

  const handleEmail = () => {
    
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 이미지가 변경되었다면
    if(image != null) {
      const url = await useUploadImg(image)
      const result = await fetch(`/api/upload/image?_id=${session.user.id}&url=${url}`,{method: 'POST'})
      .then(r => r.json())
    }

    const temp = {
      id: id,
      nickname: newNickname,
      email: email,
    }


    const result = await fetch('/api/profile/update', {method:'PUT', body:JSON.stringify(temp)}).then(r=>r.json())
    if(result.toString().includes('success')) {
      router.push('/mypage/profile/complete');
    }
    





    

  }




  return (
    <div className="mx-auto max-w-2xl p-5">
      <h1 className="text-3xl font-bold text-center mb-[40px]">프로필 수정</h1>
      <div className="flex justify-center mb-5">
        {/* <div className="bg-black w-[100px] h-[100px] rounded-full"></div> */}
        <Image 
          className="rounded-full w-[100px] h-[100px] overflow-hidden"
          src={picture ? picture : '/logo2.png'}
          width={640}
          height={640}
          alt='아이콘'
        />
      </div>
      <div className="flex justify-center">
      <input 
        type='file'
        ref={imageRef}
        accept='image/*'
        multiple={false}    
        onChange={handleChange}   
        className='hidden' 
      />
        <button 
          className="border-2 border-[#998373] rounded-sm bg-inherit text-[#998373] text-xs w-[100px] h-[30px] hover:shadow-lg"
          onClick={handleClick}  
        >
          이미지 업로드
        </button>
        

      </div>
      <form onSubmit={handleSubmit} method="POST" className="m-auto p-11">
        <div className="form__block">
          <div className="flex justify-between mr-2">
            <p className="font-bold text-xl">알림 받기</p>
            <FaToggleOn size="30" color="#998373" />
          </div>
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="id">
            아이디
          </label>
          <input
            className="in bg-[#D9D4C8]"
            value="wnwlcks123"
            type="text"
            name="id"
            id="id"
            disabled
          />
        </div>
        <div className="form__block">
          <label className="lab" htmlFor="nickname">닉네임</label>
          <input
            className="in"
            value={nickname}
            type="text"
            name="nickname"
            id="nickname"
            required
            onChange={handleNickname}
          />
        </div>
        <div className="absolute translate-x-120 -translate-y-12">
          {
            checkVisable
            ?
            <div 
              className="w-24 border border-gray-300 p-3 rounded-lg cursor-pointer hover:font-bold"
              onClick={handleCheck}
            >
            중복체크
            </div>
            :
            ''
          }
          
          {
            infoVisable
            ?

            newNickname == null
            ?
            <span className="block my-1 text-red-700">중복된 닉네임 입니다.</span>
            :
            <span className="block my-1">사용 가능한 닉네임 입니다</span>
            
            :
            ''
            
            
          }
        </div>
        {
          session.user.method != 'oauth'
          ?
          <>
            <div className="form__block">
              <label className="lab" htmlFor="currentpw">현재 비밀번호</label>
              <input
                className="in"
                type="password"
                name="currentpw"
                id="currentpw"
                required
              />
            </div>
            <div className="form__block">
              <label className="lab" htmlFor="newpw">새로운 비밀번호</label>
              <input
                className="in"
                type="password"
                name="newpw"
                id="newpw"
                required
              />
            </div>
            <div className="form__block">
              <label className="lab" htmlFor="newpw_confirm">새로운 비밀번호 확인</label>
              <input
                className="in"
                type="password"
                name="newpw_confirm"
                id="newpw_confirm"
                required
              />
            </div>
          </>
          :
          ''

        }

        


        <div className="form__block">
          <label className="lab" htmlFor="email">이메일</label> 
          <input
            className="in"
            value={email}
            type="text"
            name="email"
            id="email"
            required
            onChange={handleEmail}
          />
        </div>
        {/* <div className="form_block">
          <p className="mt-5 text-red-500">입력한 암호가 일치하지 않습니다.</p>
        </div> */}
        <div className="form__block">
          <input type="submit" value="수정하기" className="form__btn--submit" />
        </div>
      </form>
      <div className="m-auto p-8">
        <p className="w-full max-w-[680px] text-center">회원 탈퇴</p>
      </div>
    </div>
  );
}
