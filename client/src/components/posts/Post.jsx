import React, { useEffect, useState } from 'react'
import User from '../home/User'
import { useDispatch, useSelector } from "react-redux"
import { commentPost, likePost } from '../../actions/Post';
import { getFollowingPosts, getMyPosts } from '../../actions/FollowingPost';
import LikeAndComment from '../likeAndcomment/LikeAndComment'
import Image from '../lazyload/Image';
import PostViewer from './PostViewer';
import DialogBox from '../dialogbox/DialogBox';


const Post = ({
  postId,
  caption,
  postImage,
  ownerImage,
  ownerName,
  likes = [],
  comments = [],
  ownerId,
  isDelete = false,
  isAccount = false
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [isCommentOpen, setIsCommentOpen] = useState(false)

  useEffect(() => {
    if (user && likes) {
      const isUser = likes.filter(({ _id }) => {
        return user._id === _id
      })
      // console.log(isUser);
      if (isUser.length > 0) {
        setIsLiked(true);
      }
      else {
        setIsLiked(false);
      }
    }
  }, [dispatch]);
  const handleLike = async () => {
    setIsLiked(!isLiked)
    await dispatch(likePost(postId))
    if (isAccount) {
      dispatch(getMyPosts())
    }
    else {
      dispatch(getFollowingPosts())
    }
  }
  const handleClick = (e) => {
    e.stopPropagation();
  }
  const handleComment = async (comment) => {
    if (comment.length === 0) {
      return;
    }
    await dispatch(commentPost(postId, comment))
    if (isAccount) {
      dispatch(getMyPosts())
    }
    else {
      dispatch(getFollowingPosts())
    }

  }
  return (
    <div className={` w-full ${isAccount?"md:w-[45%]":"md:w-[80%]"} h-[44rem] bg-inherit border border-slate-500 rounded-xl p-2`}>
      <User
        imgUrl={ownerImage}
        userName={ownerName}
        isPost={true}
        postId={postId}
        userId={ownerId}
        
      />
      <Image
      src={postImage}
      />

      <LikeAndComment
        handleLike={handleLike}
        setIsCommentOpen={setIsCommentOpen}
        isLiked={isLiked}
        setIsOpen={setIsOpen}
        likes={likes}
      />

      <div className='bg-inherit mt-1'>
        <span className='font-semibold text-md bg-inherit text-white '>{ownerName}</span>
        <div className='inline text-md bg-inherit text-white'>  {caption}</div>
        <p className='text-md bg-inherit text-slate-400'>View all {comments.length} comments</p>
      </div>
      <DialogBox
       isOpen={isOpen}
       setIsOpen={setIsOpen}
       children={{data:likes,head:"Likes"}}
       handleClick={handleClick}
      />
      <PostViewer
          isCommentOpen={isCommentOpen}
          setIsCommentOpen={setIsCommentOpen}
          handleClick={handleClick}
          comments={comments}
          handleLike={handleLike}
          isLiked={isLiked}
          likes={likes}
          handleComment={handleComment}
          postId={postId}
          postImage={postImage}
          isAccount={isAccount}
          ownerId={ownerId}
      />
    </div>
  )
}

export default Post