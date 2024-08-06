import React, { useEffect, useState } from 'react'
import { GoSearch } from "react-icons/go";
import User from '../home/User';
import { useDispatch, useSelector } from 'react-redux';
import { findUser } from '../../actions/FindUser';
import Loader from '../loader/Loader';

const Search = () => {
    const [query,setQuery] = useState(null)
    const [displayMessage,setDisplayMessage] = useState("")
    const { loading, user, error } = useSelector(state => state.findUserReducer)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(user){
            dispatch({
                type:"CLEAR_FIND_USER"
            })
        }
        if(error){
            dispatch({
                type:"CLEAR_FIND_USER_ERR"
            })
        }
    },[])
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(findUser(query))
        setDisplayMessage(user?"":"Oops !! could'nt find a user")
    }
    return (
        <div className='md:p-5 p-5 w-full md:w-[82%] flex flex-col justify-start items-center'>
            <form className='md:w-1/2 w-full flex justify-center items-center p-2'
            onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    className='w-[90%] h-12 px-5 py-1 border-white  bg-[#3d0c02] focus:border-none shadow-xl focus:outline-none rounded-tl-xl border-none rounded-bl-xl  text-slate-300 '
                    style={{ outline: 'none' }}
                    placeholder='Search...'
                    onChange={(e)=>setQuery(e.target.value)}
                />
                <div className='w-[10%] shadow-xl h-12 flex justify-center items-center bg-[#3D0C02] text-slate-300  rounded-tr-xl rounded-br-xl'>
                    <GoSearch className='text-2xl'
                    />
                </div>
            </form>
            <div className='md:w-1/2 w-full flex   justify-center items-center p-2'>
               {
                loading && <Loader/>
               }
               {
                user?<User
                imgUrl={user?.avatar?.url}
                userName={user?.username}
                userId={user?._id}

                />:!loading&&<div className='text-2xl text-slate-400'>
                    {displayMessage}
                </div>
               }
            </div>

        </div>
    )
}

export default Search