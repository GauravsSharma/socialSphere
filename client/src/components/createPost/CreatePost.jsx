import React, { useState, useRef } from 'react';
import { TbCircleDashedPlus } from "react-icons/tb";
import {useDispatch,useSelector} from "react-redux"
import { uploadPost } from '../../actions/Post';
import { Toaster, toast } from 'sonner'
import { loadUser } from '../../actions/User';
import { getMyPosts } from '../../actions/FollowingPost';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const fileInputRef = useRef(null);
    const {loading} = useSelector((state)=>state.likePost);
    const dispatch = useDispatch()

    const handleIconClick = () => {
        fileInputRef?.current?.click();
    };
   
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
    const handleSubmit = (e) =>{
       e.preventDefault()
       const myPromise = new Promise(async (resolve, reject) => {
        try {
          await dispatch(uploadPost(image, caption));
          resolve();
        } catch (error) {
          reject(error);
        }
      });
      toast.promise(myPromise, {
        loading: 'Loading',
        success: 'Post uploaded successfully',
        error: 'Error uploading post',
      });
      dispatch(loadUser());
      dispatch(getMyPosts())
      setCaption("");
      setImage(null)
    }
    return (
        <div className='w-full h-screen flex justify-center items-center oy-5 px-5'>
            <form className='w-full md:w-[70%] flex flex-col md:flex-row h-full md:h-[70%] shadow-lg border-slate-600 border rounded-lg'
            onSubmit={(e)=>handleSubmit(e)}
            >
                <div className="img w-full md:w-[45%] h-[70%] md:h-full flex flex-col justify-center items-center overflow-hidden border-r border-slate-600">
                    {image ? (
                        <img src={image} alt="Uploaded" className='w-full h-[90%] object-cover' />
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
                            <p
                                className='text-md text-blue-500 cursor-pointer'
                                onClick={handleIconClick}
                            >Change Image</p>
                        </div>
                    }
                </div>
                <div className='w-full md:w-[55%] h-[30%] md:h-full flex flex-col justify-start  md:justify-center items-center px-10'>
                    <input
                        type="text"
                        placeholder='Write a caption'
                        className='outline-none p border-b w-full text-lg  text-white bg-inherit rounded-md'
                        value={caption}
                        onChange={(e)=>setCaption(e.target.value)}
                    />
                    <button type="submit" className='w-full py-2 bg-[#F2613F] mt-5 rounded-lg text-md font-semibold text-white'
                    disabled={loading}
                    >
                        Post
                    </button>
                </div>
            </form>
            <Toaster position="bottom-center" richColors/>
        </div>
    );
};

export default CreatePost;
