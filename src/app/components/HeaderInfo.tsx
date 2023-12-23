'use client'
import React, { useEffect, useState } from 'react'
import { FaBell } from 'react-icons/fa'
import clsx from 'clsx'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'



interface AlarmsContents {
  _id: string,
  check: boolean,
  content: string,
  date: string,
  link: string,
  receiver: string,
  role: string,
}

interface HeaderInfoProps {
  session: any;
  alarms: AlarmsContents[];
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ session, alarms }) => {
  const [isDropboxOpen, setIsDropboxOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [alarmsContens, setAlarmsContens] = useState<AlarmsContents[]>([])


  useEffect(() => {
    setAlarmsContens([...alarms])
  
  }, [])
  

  const handleClick = () => {
    setIsAlarmOpen(false)
    setIsDropboxOpen(!isDropboxOpen);
  }

  const handleAlarm = () => {
    setIsDropboxOpen(false)
    setIsAlarmOpen(!isAlarmOpen)
  }

  const handleContent = async (e:React.MouseEvent<HTMLAnchorElement>, id:object | string, index:number) => {
    const response = await fetch(`/api/alarm/alarmCheck?_id=${id}`, {method:'POST'})
    .then(r => r.json())
    .then(r => {
        alarmsContens[index].check = true
        setAlarmsContens([...alarmsContens.slice(0,index), alarmsContens[index], ...alarmsContens.slice(index+1, alarmsContens.length)])
      })     
  }

  const alarmTime = (input: string | number | Date) => {
    const currentTime = Number(new Date());
    const inputTime = Number(new Date(input))

    // 시간 차이 계산 (밀리초 단위)
    const timeDiff = currentTime - inputTime;

    // 밀리초를 분, 시간, 일, 월, 년으로 변환
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.44); // 평균 월 길이
    const years = Math.floor(months / 12);

    // 결과 생성
    if (minutes < 60) {
      return `${minutes}분 전`;
    } else if (hours < 24) {
      return `${hours}시간 전`;
    } else if (days < 30) {
      return `${days}일 전`;
    } else if (months < 12) {
      return `${months+1}개월 전 `;
    } else {
      return `${years}년 전 `;
    }
  }

  
  

  return (
    <div>
      {
        session 
        // 로그인 상태일 때
        ?
        <div className="absolute right-0 flex items-center px-7 py-3">
          <div className="right-1 flex justify-center items-center">            
              <div className='absolute w-5 top-5 left-14 font-bold text-sm text-center rounded-2xl bg-red-600 text-white'>
                {alarmsContens.filter((x:AlarmsContents) => x.check == false).length ? alarmsContens.filter((x:AlarmsContents)=> x.check == false).length : ''}   
              </div> 
            <FaBell className={`block mx-4 mr-6 text-sygnature-beige cursor-pointer border-sygnature-brown rounded-xl hover:text-red-400 ${isAlarmOpen ? 'text-red-400' : ''}`} onClick={handleAlarm} size="30"/>
            <img 
              className="rounded-full h-14 w-14 overflow-hidden cursor-pointer hover:scale-105 transition duration-300"
              src={session.user.image ? session.user.image : '/logo2.png'}
              width={640}
              height={640}
              alt='아이콘'
              onClick={handleClick}
            />
            

            {/* 알람 아이콘 클릭시 나오는 드랍박스 */}
            <div 
            className={clsx( 
              'bg-sygnature-beige top-20 w-96 h-80 overflow-scroll font-bold absolute rounded-md text-center transform -translate-x-24 py-3 z-10',
              {
                'visible' : isAlarmOpen === true,
                'hidden' : isAlarmOpen === false
              }
              )}
              onClick={()=>{setIsAlarmOpen(false)}}           
              >                

              {
                alarmsContens.length
                ?
                alarmsContens.sort((a:AlarmsContents, b:AlarmsContents) => Number(new Date(b.date)) - Number(new Date(a.date))).map((x, i) => (
                  <div 
                    key={x._id.toString()} 
                    className='my-2 hover:scale-105 transition duration-300'
                  >
                  <Link 
                    href={x.link.toString()} 
                    className={`h-16 cursor-pointer py-1 ${x.check ? 'opacity-50': 'opacity-100'}`}
                    onClick={(e) => {handleContent(e, x._id, i)}}
                  >
                    <span className='text-left'>{x.content}</span>
                    <div className='text-left text-sm opacity-80 ml-8'> {alarmTime(x.date)}</div>
                    <div className='flex justify-center'>
                      <div className='h-[0.5px] w-full bg-black opacity-30'></div>
                    </div>
                  </Link>
                  </div>
                ))
                :
                <div>등록된 알람이 없습니다.</div>
              }
              
            </div>
            
            
            {/* 유저 아이콘 클릭시 나오는 드랍박스 */}
            <div 
            className={clsx('bg-sygnature-beige top-20 w-40 h-auto pt-2 absolute rounded-md text-center flex flex-col items-center justify-center transform origin-top',
              {
                'visible' : isDropboxOpen === true,
                'invisible' : isDropboxOpen === false
              }
              )}   
              onClick={handleClick}           
            >
              <Link 
                href={'/mypage'} 
                className='hover:font-bold' 
              >
                마이페이지
              </Link>
              <div className='hover:font-bold cursor-pointer py-1' onClick={() => {signOut()}}>
                로그아웃
              </div>
              {
                session.user.role == 'admin'
                ?
                <>
                <Link 
                  href={'/admin/propose/list'} 
                  className='hover:font-bold' 
                >
                  장소 제안 목록 
                </Link>
                <Link 
                  href={'/admin/police/list'} 
                  className='hover:font-bold' 
                >
                  신고 목록 
                </Link>
                </>
                :
                ''
              }
              <div className="absolute bottom-full left-1/2 transform translate-x-6 w-0 h-0 border-solid border-8 border-transparent border-b-sygnature-beige"></div>
            </div>
          </div>
        </div>

        :

        // 비 로그인 상태일 때
        <div className="absolute right-0 top-4 flex items-center px-7 py-3">
          <div className="right-1 flex justify-center items-center text-sygnature-beige font-bold">
            <div className='mx-5 cursor-pointer' onClick={() => signIn()}>로그인</div>
            <Link href={'/signup'} className='mx-5'>회원가입</Link>
          </div>
        </div>
      }
    </div>
  )
}

export default HeaderInfo