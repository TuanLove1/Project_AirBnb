import { StarIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { api } from '../../api/utils'

export const Booking = (props) => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        roomId: props.params.id,
        checkIn: '',
        checkOut: '',
    })
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        });
    }
    const bookRoom = (book) => {
        api.post('rooms/booking', book)
            .then((result) => {
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>{result.data.message}</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success'
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (localStorage.getItem('user')) {
            bookRoom(state)
        }
        else{
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <strong>Bạn chưa đăng nhập</strong>,
                html: <i>You clicked the button!</i>,
                icon: 'error'
            })
            navigate('/login')
        }
    }
    return (
        <form onSubmit={handleSubmit} className='border-2 rounded-xl shadow-xl mt-5 hover:scale-105 transition ease-linear cursor-pointer '>
            <div className='mx-4 p-4'>
                <div className='flex justify-between items-center mb-3'>
                    <div className='font-bold'>{props.data?.price}$/ đêm</div>
                    <div className='flex '>
                        <StarIcon className='h-6 w-6 text-red-400' />
                        <span>(18 đánh giá)</span>
                    </div>
                </div>
                <div className='flex justify-between mb-3'>
                    <div className='p-2 border-2 rounded-xl'>
                        <label >Nhận phòng</label>
                        <input type='date' name='checkIn' onChange={handleOnchange} className="form-control" id="checkIn" />
                    </div>
                    <div className='p-2 border-2  rounded-xl'>
                        <label >Trả phòng</label>
                        <input type='date' name='checkOut' onChange={handleOnchange} className="form-control" id="checkOut" />
                    </div>
                </div>
                <div className='p-2  border-2 rounded-xl mb-3'>
                    <div>
                        <label htmlFor="quantity">Khách</label>
                        <input className='w-100 border-2' type="number" id="quantity" name="quantity" min={1} max={5} />
                    </div>

                </div>
                <div className='booking__button btn-76 bg-red-400 text-white text-center rounded-xl p-2 mb-3'>
                    <button >Đặt phòng</button>
                </div>
                <div className='flex justify-between p mb-3'>
                    <div className=''>
                        {props.data?.price}$ x 5
                    </div>
                    <div className=''>
                        $221
                    </div>
                </div>
                <div className='text-right font-bold'>Tổng $252</div>
            </div>
        </form>
    )
}
