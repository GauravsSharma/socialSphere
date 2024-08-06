import React, { useEffect } from 'react'
import StoryCart from "./StoryCart"
import { useDispatch, useSelector } from 'react-redux'
import { getFollowingStory, getMyStory } from '../../actions/Story'

const StoryCmp = () => {
  const { myStory, followingStory } = useSelector(state => state.storyReducer)
  const dispatch = useDispatch();
  const getStories = async () => {
    await dispatch(getMyStory())
    console.log("story cmp mountng");
    dispatch(getFollowingStory())
  }
  useEffect(() => {
    //  getStories()
  }, [])

  return (
    <div className='h-24 w-full flex gap-5 justify-start item-center'>
      <StoryCart isAdmin={true} story={myStory} />
      {
        followingStory?.map((story) => (
          <StoryCart
            key={story._id}
            story={story}
          />
        ))
      }
    </div>
  )
}

export default StoryCmp