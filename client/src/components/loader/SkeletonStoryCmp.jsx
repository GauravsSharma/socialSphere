import React from 'react'

const SkeletonStoryCmp = () => {
    return (
        <div className='h-24 w-full flex gap-5 justify-start  item-center'>
            {Array(3).fill(0).map((_, index) => <div key={index} className='animate-pulse md:h-16 md:w-16 bg-slate-300 rounded-full w-[5rem] h-[5rem]'>
            </div>)}
        </div>
    )
}

export default SkeletonStoryCmp