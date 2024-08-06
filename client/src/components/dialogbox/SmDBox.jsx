import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deletePost, logout } from '../../actions/Post'
import { getMyPosts } from '../../actions/FollowingPost'
import { loadUser } from '../../actions/User'
import Loader from '../loader/Loader'
import { useNavigate } from 'react-router-dom'
const SmDBox = ({
    isPost = true,
    isOpen,
    setIsOpen,
    postId
}) => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.likePost)
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.stopPropagation()
        if (isPost) {
            await dispatch(deletePost(postId))
            await dispatch(getMyPosts())
        }
        else {
            await dispatch(logout())
            navigate("/login")
        }
        await dispatch(loadUser())
        setIsOpen(false)
    }
    return (
        <>
            {isOpen && <div className='fixed z-10 flex justify-center items-center h-screen w-[98vw] top-0 left-0 bg-black/30'
                onClick={() => setIsOpen(false)}
            >
                <div className='h-48 w-96 overflow-hidden text-white bg-[#260701] shadow-lg rounded-xl'>
                    <div className=' flex justify-center items-center flex-col h-1/2'>
                        <h1 className='text-2xl text-center'> {isPost ? "Delete post?" : "Logout account ?"}</h1>
                        <p className='text-sm mt-1 text-center text-slate-400'>
                            {isPost ? "Are you sure you want to delete this post?" : "Are you sure you want to logout ?"}
                        </p>
                    </div>
                    <div className='h-1/2'>
                        <button className='border-t border-slate-700 text-red-500 text-center  w-full py-2 font-semibold'
                            onClick={(e) => handleClick(e)}
                        >
                            {loading && <Loader />
                            }
                            {isPost ? "Delete" : "Logout"}
                        </button>
                        <button className='border-t border-slate-700 text-center  w-full py-2 font-semibold'
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default SmDBox