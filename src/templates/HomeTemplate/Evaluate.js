import { StarIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import { api } from '../../api/utils'
import Moment from 'react-moment';
import { Comment } from '../../components/Comment/Comment';
import { ClipLoader } from 'react-spinners';
export const Evaluate = (props) => {
    console.log(props.params.id);
    const [datas, setData] = useState([]);
    const [limit, setLimit] = useState(4);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        api.get(`reviews/byRoom?roomId=${props.params.id}&limit=${limit}`)
            .then((result) => {
                setData(result.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [limit])
    const renderLimit = () => {
        setLimit(limit + 4)
    }
    const renderComment = () => {
        return datas?.map((comment, index) => {
            return <div key={index} className='col l-6 mf8-6 c-12'>
                <div className='flex my-2'>
                    <div className='evalute__img mr-2'>
                        <img className='w-10 h-10 rounded-full' src={comment.userId.avatar} />
                    </div>
                    <div className='evalute__info'>
                        <h1 className='font-bold'>{comment.userId.name}</h1>
                        <Moment className='text-gray-400' format='MMMM Do YYYY, h:mm:ss a'>{comment.created_at}</Moment>
                    </div>
                </div>
                <p className='font-bold'>{comment.content}</p>
                <div className='w-20 h-1 bg-gray-200 mx-auto mt-3' />
            </div>
        })
    }
    if (loading) return <div className='text-center'><ClipLoader className='text-red-400' color="#ef7983" /></div>

    return (
        <>
            <div className='grid wide mb-5'>
                <div className='flex items-center font-bold mb-3'>
                    <StarIcon className='w-6 h-6 text-red-400 mr-2' /><h1>4,83(18 đánh giá)</h1>
                </div>
                {(localStorage.getItem("user")) ? <Comment dataId={props} /> : ''}
                <div className='row'>
                    {renderComment()}
                    <div className='mx-auto mt-2'>
                        <button onClick={renderLimit} className='bg-red-400 rounded-md p-1 text-white'>Đọc thêm</button>
                    </div>
                </div>
            </div>
        </>
    )
}
