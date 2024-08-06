import React, { useEffect } from 'react'
import User from './User'
import {useDispatch, useSelector} from "react-redux"
import { getAllUsers } from '../../actions/User'
const Users = () => {
  const dispatch = useDispatch()
  const {user,loading} = useSelector(state=>state.allUsers)
  useEffect(()=>{
  dispatch(getAllUsers())
  },[])
  return (
    <div className='hidden md:block md:w-[35%] h-auto p-5 shadow-2xl mr-6 my-3 rounded-xl '>
         <h1 className='text-lg font-bold py-2 bg-inherit text-white border-b'>
            Add Users 
         </h1>
         <div className='mt-5 bg-inherit flex flex-col gap-2 w-full'>
          {
            user?user.map((person)=>(
              <User 
              key={person._id}
              userId={person._id}
              imgUrl = {person.avatar.url}
              userName = {person.name}
             />
            )):"No user found"
          }
          
         </div>
    </div>
  )
}

export default Users