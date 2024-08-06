import React from 'react'
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { LiaComments } from "react-icons/lia";


const LikeAndComment = ({
  handleLike,
  ownerId,
  isLiked,
  setIsCommentOpen,
  isFromComment,
  setIsOpen=()=>{},
  likes
}) => {    
  return (
    <>
    <div className={`flex justify-between items-center bg-inherit ${!isFromComment&&"mt-6"}`}>
        <div className='flex bg-inherit gap-2 '>
          <div className='bg-inherit cursor-pointer active:scale-50 transition-all' onClick={handleLike}>
            {
              !isLiked ? <IoMdHeartEmpty
                className='bg-inherit text-white text-3xl' /> : <IoIosHeart className='bg-inherit text-red-600 text-3xl' />
            }
          </div>
          <LiaComments className='bg-inherit text-white text-3xl cursor-pointer' 
          onClick={()=>setIsCommentOpen(true)}
          />
        </div>
      </div>
      <p className='font-semibold text-md bg-inherit text-white mt-1 cursor-pointer'
        onClick={() => setIsOpen(true)}
      >{likes.length} likes</p>
      </>
  )
}

export default LikeAndComment