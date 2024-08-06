import React from 'react'
import StoryCarousel from '../carousels/StoryCarousel'

const StoryViewer = ({
  isOpenViewer = true,
  setIsOpenViewer,
  story
}) => {

  const handleClick = (e) => {
    e.stopPropagation()
  }
if(!story) return null
  return (
    <>
      {
        isOpenViewer && <div className='h-screen w-[98vw] flex justify-center items-center bg-black/60 fixed top-0 left-0 z-50'
          onClick={() => setIsOpenViewer(false)}
        >
          <div className=' h-[100%] w-[30%] bg-[#260701] flex flex-col md:flex-row gap-3 z-50' onClick={handleClick} >
            <StoryCarousel story={story}/>
          </div>
        </div>
      }
    </>
  )
}

export default StoryViewer