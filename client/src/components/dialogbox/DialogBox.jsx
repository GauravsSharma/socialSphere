import React from 'react'
import User from '../home/User'

const DialogBox = ({
    isOpen,
    setIsOpen,
    children,
    handleClick
}) => {
  return (
    <>
       {
        isOpen && <div className='h-screen w-[98vw] flex justify-center items-center
      bg-black/40 fixed top-0 left-0 z-40'
          onClick={() => setIsOpen(false)}
        >
          <div className=' h-96 w-[95%] md:w-[30%] bg-[#260701] rounded-lg overflow-y-auto flex flex-col gap-3 p-5' onClick={(e) => handleClick(e)}>
            <div className=' w-full  shadow-md py-2 text-2xl text-white font-semibold mb-3'>{children.head}</div>
            {
              children?.data?.length > 0 ?( children.data.map((user) => {
                return <User
                  key={user._id}
                  imgUrl={user.avatar.url}
                  userName={user.name}
                  userId={user?._id}
                  isInlike={true}
                />
              })) :(
                <div className='text-slate-300 font-semibold text-xl'>No user found</div>
              )
            }
          </div>
        </div>
      }
    </>
  )
}

export default DialogBox