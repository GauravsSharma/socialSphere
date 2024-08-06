import React from 'react'

const SkeletonCard = ({
    isAccount = false
}) => {
    return (

        <div className={`w-full ${isAccount ? "md:w-[45%]" : "md:w-[80%]"} h-[44rem] bg-inherit border border-slate-500 rounded-xl p-2`}>
            <div className="animate-pulse p-4">
                <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                    <div className="flex-1">
                        <div className="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
                        <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                    </div>
                </div>
            </div>

            <div className='w-full h-[70%] flex justify-center items-center'>
                <div className=" h-full w-[80%] rounded-xl animate-pulse bg-gray-300"></div>
            </div>

            <div className="animate-pulse p-4">
                <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
                <div className="mb-2 h-4 w-5/6 rounded bg-gray-300"></div>
                <div className="h-4 w-2/3 rounded bg-gray-300"></div>
            </div>
        </div>
    )
}

export default SkeletonCard