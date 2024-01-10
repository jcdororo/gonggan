'use client'
import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'


const Like = ({result, likeResult, liked_user}) => {
  const [likes, setLikes] = useState([])

  useEffect(() => {
    setLikes(likeResult)
  }, [])




  const handleClick = async (e, index, isLike, place_id, liked_user) => {

    try {
      const response = await fetch(
        `/api/like/like?place_id=${place_id}&liked_user=${liked_user}&isLike=${isLike}`,
         {method: 'POST'}
         )
        .then(r=>r.json())
        .then(r=>
          setLikes([...likes.slice(0,index), r, ...likes.slice(index+1, likes.length)])
         ) 
    } catch (error) {
      console.log('like error',error);
    }

  }


  return (
    <div>
      {
        likes.map((x,i) => (
          <div key={i} className='flex gap-7 text-3xl'>
            {result[i].location}
            <div onClick={(e) => {handleClick(e, i, x, result[i]._id, liked_user)}}>
              {
              x == 'true'
              ?
              <FaHeart />
              :
              <FaRegHeart />

            }
            </div>
            
          </div>      
        ))
      }
    </div>
  )
}

export default Like