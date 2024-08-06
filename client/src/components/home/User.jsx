import React, { useEffect, useState } from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import SmDBox from '../dialogbox/SmDBox';
import { Link } from 'react-router-dom';
import { followUser } from '../../actions/Post';
import { getFollowingPosts, } from '../../actions/FollowingPost';
import { loadUser } from '../../actions/User';
const User = ({ imgUrl, userName, isPost = false, postId, userId, isInlike = false }) => {
  const [isSmOpen, setIsSmOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteBtnShow, setIsDeleteShow] = useState()
  const [isFollowing, setIsFollowing] = useState(false)
  const dispatch = useDispatch();
  const handleOpen = (e) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  const { user } = useSelector(state => state.user)
  let isAdmin = user?._id === userId;


  useEffect(() => {
    if (!isAdmin) {
      const following = user?.following?.filter((followingUser) => followingUser._id === userId)
      following?.length > 0 ? setIsFollowing(true) : setIsFollowing(false)
    }
    setIsDeleteShow(user?._id === userId)
  }, [userId, user])

  const handleFollowUnfollow = async () => {
    setIsFollowing(prev => !prev)
    await dispatch(followUser(userId));
    await dispatch(loadUser());
    dispatch(getFollowingPosts())
  }

  return (
    <div className={`w-full  relative h-[4.5rem] md:h-16 ${!isPost && "h-10"} ${!isPost && "rounded-xl m-0"} hover:shadow-2xl bg-inherit  ${!isPost && "border border-slate-600"} flex gap-2 px-2 items-center`}
      onClick={() => setIsOpen(false)}
    >
      <img src={imgUrl} alt="" className='md:h-10 md:w-10 h-14 w-14 rounded-full object-cover' />
      <div className='bg-inherit'>
        {
          isAdmin ?
            <h1 className='text-sm text-white bg-inherit font-semibold hover:underline cursor-pointer'>{userName}</h1>
            :
            <Link to={`/profile/${userId}`}>
              <h1 className='md:text-sm text-lg text-white bg-inherit font-semibold hover:underline cursor-pointer'>{userName}</h1>
            </Link>
        }
      </div>
      {
        !isInlike && isAdmin && <BsThreeDotsVertical className='bg-inherit text-white text-xl cursor-pointer absolute top-4 right-2'
          onClick={(e) => handleOpen(e)}
        />
      }
      {
        !isAdmin && <button className='md:h-8 md:w-24 w-28 h-10 text-slate-300  flex justify-center items-center  border-2 border-slate-300 rounded-lg md:text-lg text-xl absolute top-4 right-2'
          onClick={handleFollowUnfollow}
        >
          {isFollowing ? "following" : "follow"}
        </button>
      }
      {
        isDeleteBtnShow && isOpen && <div className='h-auto w-40 absolute top-full right-5 shadow-lg bg-[#364050] z-10 py-1 px-2 rounded-md'>
          <div className='bg-inherit flex items-center gap-2 w-full'
          >
            <MdOutlineDelete className='text-red-500  text-2xl bg-inherit' />
            <h1 className='text-red-500  text-lg bg-inherit cursor-pointer '
              onClick={() => setIsSmOpen(true)}
            >Delete</h1>
          </div>
        </div>
      }
      <SmDBox
        isOpen={isSmOpen}
        setIsOpen={setIsSmOpen}
        postId={postId}
      />
    </div>
  )
}

export default User
