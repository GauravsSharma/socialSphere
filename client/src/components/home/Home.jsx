import React, { useEffect } from 'react'
import SubHome from './SubHome'
import Users from './Users'


const Home = () => {

  return (
    <div className=' h-full w-[95%] md:w-full rounded-lg flex justify-between items-start  p-2 gap-2'>
      <SubHome />
      <Users />
    </div>
  )
}

export default Home