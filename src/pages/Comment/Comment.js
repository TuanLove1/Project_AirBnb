import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { ClipLoader } from 'react-spinners';
import { actComment } from './reducer/actions';
export const Comment = (props) => {
    let avatar = JSON.parse(localStorage.getItem('user'))
    console.log(props.dataId.params.id);
    const dispatch = useDispatch();
    const prop = useSelector((state) => state.commentReducer)
    const {loading} = prop
    console.log(loading);
    const [comment,setComment] = useState({
        content:''
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(actComment(props.dataId.params.id,comment))
    }
    const handleOnChange = (e) => {
        const {id,value} = e.target
        setComment({
            ...comment,
            [id]:value,
        }) 
    }
    console.log(comment);
    return (
        <>
        {loading ? <div style={{ backgroundColor: 'rgba(0,0,0,.5)', height: '100%', width: '100%', position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '999' }} className=''>
                <ClipLoader color='rgb(248 113 113)' />
            </div> : ''}
        <form onSubmit={handleSubmit} className='grid wide mb-4'>
            <div className='row'>
                <div className='col l-10 mf8-10 c-12'>
                    <div className='flex my-2'>
                        <div className='comment__img mr-2'>
                            <img className='w-10 h-10 rounded-full' src={avatar.avatar} alt='avatar' />
                        </div>
                        <div className='comment__info w-full border-2 rounded-xl flex justify-between items-center'>
                            <div className='comment__input w-full'>
                                <input  id='content' onChange={handleOnChange} className='w-full  h-full outline-none ml-4' placeholder='Viết bình luận' />
                            </div>
                            <div className='comment__icon flex space-x-2 mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 cursor-pointer hover:bg-slate-300 hover:text-white rounded-full hover:shadow-md transition ease-linear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 cursor-pointer hover:bg-slate-300 hover:text-white rounded-full hover:shadow-md transition ease-linear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300 cursor-pointer hover:bg-slate-300 hover:text-white rounded-full hover:shadow-md transition ease-linear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                        </div>
                    </div>
            <div className='text-right'>
                <button className='text-right bg-red-400 text-white rounded-md p-1'>Bình luận</button>
            </div>
                </div>
            </div>
        </form>
        </>
    )
}
