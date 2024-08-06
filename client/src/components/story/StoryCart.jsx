import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";
import StoryDialogBox from './StoryDialogBox';
import StoryViewer from './StoryViewer';
import { useSelector } from 'react-redux';
const StoryCart = ({
    story,
    isAdmin = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenViewer, setIsOpenViewer] = useState(false)
    const {user} = useSelector(state=>state.user)
    const handleOpenAddStory = (e) => {
        e.stopPropagation();
        setIsOpen(true);
    }
    return (
        <div className='text-center cursor-pointer'>
            <div className={`${story ? "border-gradient" : "border-normal"}  md:h-16 md:w-16 w-[5rem] h-[5rem] rounded-full  flex justify-center items-center bg-inherit`}
                onClick={() => setIsOpenViewer(true)}
            >
               {story ? <img src={story?.owner?.avatar?.url} alt="" className='h-[95%] w-[95%] object-cover rounded-full'/>
               :  isAdmin&&<img src={user?.avatar.url} alt="" className='h-[95%] w-[95%] object-cover rounded-full'/>}
                {
                    isAdmin && <div className='text-white z-10 bg-blue-500 p-1 bottom-1 -right-1.5 absolute rounded-full cursor-pointer'
                        onClick={handleOpenAddStory}
                    >
                        <FiPlus />
                    </div>
                }
            </div>
            <h1 className='text-white text-sm mt-1'>{story?.owner?.username}</h1>
            {!story && <h1 className='text-white text-sm mt-1'>Add story</h1>}
            <StoryDialogBox
                setIsOpen={setIsOpen}
                isOpen={isOpen}
            />
            <StoryViewer
                story={story}
                isOpenViewer={isOpenViewer}
                setIsOpenViewer={setIsOpenViewer}
            />
        </div>
    )
}

export default StoryCart