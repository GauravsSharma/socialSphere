import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, getUserProfilePosts } from '../../actions/FollowingPost';
import Post from '../posts/Post';
import DialogBox from '../dialogbox/DialogBox';
import Loader2 from '../loader/Loader2';
import { getUser, loadUser } from '../../actions/User';
import SmDBox from '../dialogbox/SmDBox';
import { useParams } from 'react-router-dom';
import { followUser } from '../../actions/Post';
import Loader from '../loader/Loader';
import ProfileUpdateDb from '../dialogbox/ProfileUpdateDb';
import SkeletonCard from '../loader/SkeletonCard';

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmOpen, setIsSmOpen] = useState(false)
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false)
  const [children, setChildren] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts, loading } = useSelector(state => state.postsReducer);
  const { user: admin,loading:loading2 } = useSelector(state => state.user);
  const { user: otherUser,loading:loading3 } = useSelector(state => state.userProfile)
  const userProfile = id ? otherUser : admin;
  
  useEffect(() => {
    if (id) {
      const following = otherUser?.followers.filter(({ _id }) => admin._id === _id);
      setIsFollowing(following?.length > 0 ? true : false)
      dispatch(getUserProfilePosts(id))
      dispatch(getUser(id))
    }
    else {
      dispatch(getMyPosts())
      dispatch(loadUser())
    }
  }, [id, dispatch])

  const handleOpenFollowers = () => {
    if(id){
      setChildren({ data: otherUser?.followers, head: "Followers" });
    }
    else{
      setChildren({ data: admin?.followers, head: "Followers" });
    }
    setIsOpen(true);
  };

  const handleOpenFollowing = () => {
    if(id){
      setChildren({ data: otherUser?.following, head: "Following" });
    }
    else{
      setChildren({ data: admin?.following, head: "Following" });
    }
    setIsOpen(true);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleFollow = async () => {
    try {
      setIsFollowing(!isFollowing);
      await dispatch(followUser(otherUser._id));
      await dispatch(getUser(id));
      dispatch(loadUser());
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return (
      <div className=' py-5 flex w-full px-5 flex-wrap justify-center items-center gap-4'>
        {Array(3).fill(0).map((_, index) => <SkeletonCard isAccount={true} key={index} />)}
      </div>
    );
  }
  return (
    <div className='w-full p-5 md:p-10'>
      <div className='flex flex-col md:flex-row justify-center items-center w-full border-b pb-8 border-slate-500 '>
        <div className='w-[40%] flex justify-center items-center'>
          <img src={userProfile?.avatar.url} alt="" className='h-40 w-40 object-cover rounded-full' />
        </div>
        <div className='w-full px-2 mt-5 md:w-[60%]'>
          <div className="name flex flex-col md:flex-row justify-start items-center gap-4 text-white">
            <p className='font-bold text-2xl'>{userProfile?.name}</p>
            {!id && (
              <div>
                <button
                  className='border-2 text-xl mr-4 border-slate-400 py-2 px-4 md:py-1 md:px-3 rounded-md md:text-sm'
                  onClick={() => setIsUpdateProfileOpen(true)}
                >Edit profile</button>
                <button
                  className='border-2 text-xl border-red-500 py-2 px-4 md:py-1 md:px-3 rounded-md md:text-sm text-red-500'
                  onClick={() => setIsSmOpen(true)}
                >Logout</button>
              </div>
            )}
          </div>
          <h1 className='text-slate-300 text-lg text-center md:text-start'>{userProfile?.username}</h1>
          <div className="follow mt-1 flex justify-center md:justify-start text-white gap-10 items-center text-lg">
            <p><span className='font-semibold'>{userProfile?.post.length}</span> posts</p>
            <p className='cursor-pointer' onClick={handleOpenFollowers}><span className='font-semibold'>{userProfile?.followers.length}</span> followers</p>
            <p className='cursor-pointer' onClick={handleOpenFollowing}><span className='font-semibold'>{userProfile?.following.length}</span> following</p>
          </div>
          {id && (
            <button
              className={`mt-5 flex justify-center items-center gap-2 rounded-lg py-1 px-4 text-white ${isFollowing ? 'bg-transparent border-2' : 'bg-blue-500'} w-full md:w-[57%]`}
              onClick={handleFollow}
            >
              {isFollowing ? 'Following' : 'Follow'}
              {loading && <Loader />}
            </button>
          )}
        </div>
      </div>
      <div className="posts py-5 flex w-full px-5 flex-wrap justify-center items-center gap-4">
      
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              likes={post.likes}
              comments={post.comments}
              ownerId={post.owner._id}
              isAccount={true}
            />
          ))
        ) : (
          <div className='text-slate-500 font-bold'>No posts yet</div>
        )}
      </div>
      <DialogBox
        handleClick={handleClick}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={children} />
      <SmDBox
        isOpen={isSmOpen}
        setIsOpen={setIsSmOpen}
        isPost={false} />
      <ProfileUpdateDb
        handleClick={handleClick}
        isOpen={isUpdateProfileOpen}
        setIsOpen={setIsUpdateProfileOpen}
      />
    </div>
  );
}

export default Account;
