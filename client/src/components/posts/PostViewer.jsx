import React, { useState } from 'react'
import UserComment from '../likeAndcomment/UserComment'
import LikeAndComment from '../likeAndcomment/LikeAndComment'
import { useSelector } from 'react-redux'
import Loader from '../loader/Loader'
import { IoClose } from "react-icons/io5";
const PostViewer = ({
  isCommentOpen,
  setIsCommentOpen,
  handleClick,
  comments,
  handleLike,
  isLiked,
  likes,
  handleComment,
  postId,
  isAccount,
  postImage,
  ownerId
}) => {
  const [comment, setComment] = useState("")
  const { loading } = useSelector(state => state.likePost)
  return (
    <>
      {
        isCommentOpen && <div className='h-screen z-40 w-[98vw] flex justify-center items-center
      bg-black/40 fixed top-0 left-0'
          onClick={() => setIsCommentOpen(false)}
        >
          <div className='h-[88%] md:flex hidden bg-[#260701] overflow-y-auto md:h-[90%] w-full md:w-[70%]  rounded-lg  md:flex-row flex-col gap-3 p-2' onClick={(e) => handleClick(e)}>
            <div className='h-[70%] md:h-full w-full md:w-[40%]'>
              <img src={postImage} alt="" className='h-full w-full object-contain' />
            </div>
            <div className=' md:h-full w-full overflow-y-auto md:w-[60%] relative pt-5'>
              {
                comments && comments.length > 0 ? (
                  
                  comments.map((comm) => (
                    <UserComment
                      key={comm._id}
                      userComment={comm.comment}
                      userName={comm.user.name}
                      postId={postId}
                      commentId={comm._id}
                      userId={comm.user._id}
                      isAccount={isAccount}
                      ownerId={ownerId}
                      ownerAvatar={comm?.user.avatar.url}
                    />
                  ))
                ) : (
                  <div
                    className='w-full h-full flex justify-center items-center text-3xl text-slate-400 font-bold'
                  >No comments yet</div> // Closing the div properly and adding some text
                )
              }
              <div className="h-[22%] w-full absolute bottom-0 border-t border-slate-500 py-2">
                <LikeAndComment
                  handleLike={handleLike}
                  setIsCommentOpen={setIsCommentOpen}
                  isLiked={isLiked}
                  isFromComment={true}
                  likes={likes}
                />
                <div className='w-full flex'>
                  <input type="text" className='w-[90%] bg-transparent py-2 focus:outline-none text-white rounded-lg' placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
                  {loading ? <Loader /> : <button className='border-none w-[10%] outline-none text-blue-400'
                    onClick={() => handleComment(comment)}
                  >
                    Post
                  </button>}
                </div>
              </div>
            </div>
          </div>
          <div className='h-[80%] bg-[#260701] relative md:hidden flex  flex-col w-full' onClick={(e) => handleClick(e)}>
            <div className='h-7 w-full flex justify-end items-center px-3 py-5'>
              <IoClose className='text-3xl text-white cursor-pointer'
                onClick={() => setIsCommentOpen(false)}
              />
              
            </div>
            <div className='h-auto w-full p-5'>
              {
                comments && comments.length > 0 ? (
                  comments.map((comm) => (
                    <UserComment
                      key={comm._id}
                      userComment={comm.comment}
                      userName={comm.user.name}
                      postId={postId}
                      commentId={comm._id}
                      userId={comm.user._id}
                      isAccount={isAccount}
                      ownerId={ownerId}
                      ownerAvatar={comm?.user.avatar.url}
                    />
                  ))
                ) : (
                  <div
                  className='w-full h-full flex justify-center items-center text-3xl text-slate-400 font-bold'
                  >No comments yet</div> // Closing the div properly and adding some text
                )
              }
              </div>
              <div className='w-full flex absolute bottom-0'>
                  <input type="text" className='w-[90%] bg-transparent py-2 focus:outline-none text-white rounded-lg' placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
                  {loading ? <Loader /> : <button className='border-none w-[10%] outline-none text-blue-400'
                    onClick={() => handleComment(comment)}
                  >
                    Post
                  </button>}
                </div>
          </div>
        </div>
      }
    </>
  )
}

export default PostViewer