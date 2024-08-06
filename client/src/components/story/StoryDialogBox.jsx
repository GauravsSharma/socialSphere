import React, { useEffect, useRef, useState } from 'react'
import { TbCircleDashedPlus } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { addStory, getMyStory } from "../../actions/Story"
import { Toaster, toast } from 'sonner'
import Loader from '../loader/Loader';
const StoryDialogBox = ({
    isOpen,
    setIsOpen
}) => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const fileInputRef = useRef(null);
    const { loading, message, error } = useSelector(state => state.storyReducer)
    const dispatch = useDispatch()
    const handleIconClick = () => {
        fileInputRef?.current?.click();
    };
    useEffect(() => {
        if (message) {
            toast.success(message);
            const messageTimeout = setTimeout(() => {
                dispatch({ type: "CLEAR_STORY_MESSAGE" });
            }, 3000);

            return () => clearTimeout(messageTimeout);
        }

        else if (error) {
            toast.error(error);
            const errorTimeout = setTimeout(() => {
                dispatch({ type: "CLEAR_STORY_ERROR" });
            }, 3000); // Clear error after 5 seconds

            return () => clearTimeout(errorTimeout); // Cleanup timeout on unmount or dependency change
        }
    }, [message, dispatch, error])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleClick = (e) => {
        e.stopPropagation();
    }
    const handlePostStory = async (e) => {
        e.preventDefault()
        await dispatch(addStory(image, caption))
        dispatch(getMyStory())
        setImage(null);
        setCaption("")
    }
    return (
        <>
            {
                isOpen && <div className='h-screen w-[98vw] flex justify-center items-center bg-black/60 fixed top-0 left-0 z-50'
                    onClick={() => { setIsOpen(false); setCaption(""); setImage(null) }}
                >
                    <form className=' h-[70%] w-[60%] bg-[#260701] rounded-lg overflow-y-auto flex flex-col md:flex-row gap-3 z-50' onClick={(e) => handleClick(e)} onSubmit={handlePostStory}>
                        <div className="img w-full md:w-[45%] h-[70%] md:h-full flex flex-col justify-center items-center overflow-hidden border-r border-slate-600">
                            {image ? (
                                <img src={image} alt="Uploaded" className='w-full h-full object-cover' />
                            ) : (
                                <div className='flex justify-center items-center flex-col text-slate-400' onClick={handleIconClick}>
                                    <TbCircleDashedPlus className='text-blue-500 text-[5rem]' />
                                    <p className='text-xl font-semibold'>Add picture</p>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                            {
                                image && <div className=''>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />

                                </div>
                            }
                        </div>
                        <div className='w-full md:w-[55%] h-[30%] md:h-full flex flex-col justify-start  md:justify-center items-center px-10'>
                            <input
                                type="text"
                                placeholder='Write a caption'
                                className='outline-none px-1 py-2 border-b w-full text-xl text-white bg-inherit'
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                            <p
                                className='text-md text-blue-500 font-semibold mt-2 cursor-pointer'
                                onClick={handleIconClick}
                            >Change Image</p>
                            <button type='submit' className='w-full my-5 py-2 bg-orange-400 text-white text-center rounded-xl flex justify-center items-center gap-2' disabled={loading}>Add story
                                {
                                    loading && <Loader />
                                }
                            </button>
                        </div>
                    </form>
                </div>
            }
            <Toaster />
        </>
    )
}

export default StoryDialogBox