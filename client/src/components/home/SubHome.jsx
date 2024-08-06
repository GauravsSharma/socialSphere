import React, { useEffect } from 'react'
import Post from '../posts/Post'
import { useDispatch, useSelector } from "react-redux"
import { getFollowingPosts } from "../../actions/FollowingPost"
import StoryCmp from '../story/StoryCmp'
import SkeletonCard from '../loader/SkeletonCard'

const SubHome = () => {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(state => state.postsReducer)
  const { loading: loading2 } = useSelector(state => state.storyReducer)
  useEffect(() => {
    dispatch(getFollowingPosts());
    console.log("Subhome mounting");
  }, [])
  if (loading || loading2) {
    return (
      <>
        <div className=' w-full md:w-[63%] py-2 md:px-16 h-auto shadow-2xl  flex flex-col justify-center items-center gap-5'>
          {Array(3).fill(0).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      </>

    );
  }
  return (
    <div className=' w-full md:w-[63%] py-2 md:px-16 h-auto shadow-2xl  flex flex-col justify-center items-center gap-5'>
      <h1 className="logo text-left w-full md:hidden text-white font-briem text-3xl">
        SocialSphere
      </h1>
      <StoryCmp />

      {
        posts.length > 0 ? posts.map((post) => (
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
          />
        )) : <h1 className='text-slate-300 text-2xl'>
          Please follow people to see their posts
        </h1>
      }

    </div>
  )
}

export default SubHome