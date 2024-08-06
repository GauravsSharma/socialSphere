import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/Post';
import { Toaster, toast } from 'sonner'
import Loader2 from '../loader/Loader2';
import Loader from '../loader/Loader';

const ForgotPassword = ({ setIsSideBarHidden }) => {
    const [email, setEmail] = useState(null);
    const dispatch = useDispatch()
    const { message, loading } = useSelector((state) => state.likePost)
    useEffect(() => {
        setIsSideBarHidden(false)
        if (message) {
            toast.success(message)
        }
    }, [message, dispatch])
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email))
    }
    return (
        <div className='flex h-full -mr-64 w-[100vw] justify-center items-start p-10'>
          {!message&&<form className='w-[40%] flex justify-center items-center flex-col' onSubmit={handleSubmit}>
                <h1 className='text-white text-3xl mb-5'>Enter email to get password link</h1>
                <input type="email" className='px-2 py-1 w-full border-2 rounded-lg '
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                />
                <button type='submit' className='w-full my-5 py-2 bg-orange-400 text-white text-center rounded-xl flex justify-center items-center gap-2' disabled={loading}>Get link
                   {
                     loading&&<Loader/>
                   }
                </button>
            </form>}
            {message&&<div>
                  <h1 className='text-2xl text-white'>{message}</h1>
                </div>}
            <Toaster/>
        </div>
    )
}

export default ForgotPassword