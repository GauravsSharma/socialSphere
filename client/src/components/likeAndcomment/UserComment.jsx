import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteComment } from "../../actions/Post"
import { MdOutlineDeleteOutline } from "react-icons/md";
import { getFollowingPosts, getMyPosts } from '../../actions/FollowingPost';
const UserComment = ({
  userComment,
  ownerId,
  userId,
  userName,
  postId,
  commentId,
  ownerAvatar,
  isAccount = false
}) => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)

  const handleDelete = async () => {
    await dispatch(deleteComment(postId, commentId))
    if (isAccount) {
      dispatch(getMyPosts())
    }
    else {
      dispatch(getFollowingPosts())
    }
  }
console.log(ownerAvatar);

  return (

    <div className='w-full mb-3 flex justify-between items-center py-3 group cursor-pointer'>
      <div className='flex justify-start items-center'>
        <img
          src={ownerAvatar}
          alt=""
          className='h-10 w-10 rounded-full'
        />
        <div className='text-white px-3 flex gap-2 items-center'>
          <h4 className='text-sm font-semibold'>{userName}</h4>
          <p className='text-sm'>{userComment}</p>
        </div>
      </div>
      {user._id === userId && <MdOutlineDeleteOutline className='text-slate-300 text-xl cursor-pointer hidden group-hover:block'
        onClick={handleDelete}
      />||ownerId===user._id &&  <MdOutlineDeleteOutline className='text-slate-300 text-xl cursor-pointer hidden group-hover:block'
      onClick={handleDelete}
    />}
    </div>
  )
}

export default UserComment