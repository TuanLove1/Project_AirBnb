import React from 'react'

export const Banner = () => {
    return (
        <div className='banner relative'>
            <img className='w-full' src='https://a0.muscache.com/im/pictures/57b9f708-bb12-498c-bc33-769f8fc43e63.jpg' />
            <div className='absolute top-1/2 w-full text-center'>
                <p className='text-xl mb-5 font-bold'>Nhờ có Host,mọi điều đều có thể</p>
                <button className='btn-72 banner__button'>I'm flexible</button>
            </div>
        </div>
    )
}
