'use client'

import React, {useState} from 'react'

interface ModalProps {
  handleDelete?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const MyContents = () => {
  const [btnName, setBtnName] = useState('like')
  const [modalOpen, setModalOpen] = useState(false)

  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (event):void => {
    event.currentTarget.textContent == '좋아요' ? setBtnName('like') : setBtnName('review')
  }

  const handleDelete: React.MouseEventHandler<HTMLDivElement> | undefined = ():void => {
    setModalOpen(!modalOpen);
  }

  
  return (
    <div>


      {/* 좋아요, 리뷰 버튼 */}
      <div className='flex flex-row justify-center text-2xl pt-10 pb-3 text-center'>
        <div 
          className={`p-4 cursor-pointer mx-4 w-52 border-b-2 ${btnName == 'like' ? ' border-black font-bold' : ''}`}
          onClick={handleClick}
        >좋아요</div>
        <div 
          className={`p-4 cursor-pointer mx-4 w-52 border-b-2 ${btnName == 'review' ? ' border-black font-bold' : ''}`}
          onClick={handleClick}
        >리뷰
        </div>
      </div>

      {/* 좋아요, 리뷰 버튼에 따른 컴포넌트 보여줌 */}
      {
        btnName == 'like'
        ?
        <div className='flex flex-col place-items-center justify-center'>

          <div className='flex flex-row relative border border-black rounded-md my-3'>
            <div className='font-extrabold my-3 ml-3 mr-1 w-52'>
              캐치카페 서울대점
            </div>
            <div className='flex justify-end items-center font-bold w-56'>
              <div className='mx-5 text-3xl' style={{ color: '#998373' }}>♥</div>
            </div>
          </div>

        <div className='flex flex-row relative border border-black rounded-md my-3'>
          <div className='font-extrabold my-3 ml-3 mr-1 w-52'>
            더 카페: 이네스트점
          </div>
          <div className='flex justify-end items-center font-bold w-56'>
            <div className='mx-5 text-3xl' style={{ color: '#998373' }}>♥</div>
          </div>
        </div>

      </div>
        :
        <div className='flex flex-col place-items-center justify-center'>
          <div className='flex flex-col relative border border-black rounded-md my-3 h-40'>

            <div className='flex flex-row h-9'>
              <div className='font-extrabold my-3 mx-3 w-80 font-extrabold'>
                캐치카페 서울대점
              </div>
              <div className='flex flex-row pt-4 text-xs font-semibold'>
                <div className='ml-6 mr-1 cursor-pointer'>
                  수정
                </div>
                <div className='ml-1 mr-6 cursor-pointer' onClick={handleDelete}>
                  삭제
                </div>
              </div>
            </div>  
                      
            <div className='mx-3 my-1 text-xs font-bold'>
              ★★★★☆ 4.5
            </div>

            <div className='mx-3 text-xs'>
              2023.11.08
            </div>

            <div className='mx-2 my-2'>
              👍 15
            </div>

            <div className='flex flex-col overflow-hidden'>
              <div className='w-96 mx-3 text-xs font-medium'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div> 
            </div>
            
          </div>
        </div>



      }

      
      {/* 모달 */}
      {
        modalOpen ? <Modal handleDelete={handleDelete} /> : ''
      }

      
    </div>
  )
}

export default MyContents


const Modal: React.FC<ModalProps> = ({handleDelete}) => {
  return (
    <div>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >


          <div className="bg-white p-8 rounded-lg w-96">
            <div className='text-center'>
              리뷰를 삭제 하시겠습니까?
            </div>

            <div className='flex items-center justify-center'>
              <div className='cursor-pointer' onClick={handleDelete}>
                취소하기
              </div>
              <div>
                삭제하기
              </div>
            </div>

          </div>


        
      </div>

    </div>
  )
}