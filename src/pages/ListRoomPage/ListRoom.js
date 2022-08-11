import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../HomeTemplate/Header';
import { Footer } from '../../HomeTemplate/Footer';
import { useParams } from 'react-router-dom';
import { fectDataRoom } from './reducer/actions';
import { StarIcon } from '@heroicons/react/solid';
export const ListRoom = () => {
  let dispatch = useDispatch()
  let prop = useSelector((state) => state.dataRoomReducer)
  let params = useParams()
  useEffect(() => {
    dispatch(fectDataRoom(params.id))
  }, [])
  const renderRoom = () => {
    const { data } = prop;
    return data?.map((room, index) => {
      return <>
        <div className='row flex  mt-3 '>
          <div key={index} className='col l-4 mf8-4 c-4'>
            <div className='room__img'>
              <img className='w-100 h-100 rounded-xl' src={room.image} />
            </div>
          </div>
          <div className='col l-8 mf8-8 c-8'>
            <div className='room__info'>
              <div className='flex justify-between'>
                <p>Toàn bộ căn hộ dịch vụ tại {room.locationId.province}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>

              </div>
              <h2 className='mb-2'>{room.name}</h2>
              <div className='border-b w-10 ' />
              <p className='mt-2'>{room.guests} khách - Phòng studio - {room.bedRoom} giường - {room.bath} phòng tắm</p>
              <p>{room.hotTub && <span>Bồn nước nóng -</span>} {room.kitchen && <span>Bếp -</span>}  {room.dryer && <span>Máy sáy khô -</span>} {room.pool && <span>Hồ bơi -</span>} {room.wifi && <span>Wifi </span>}</p>
              <div className='flex justify-between items-center my-2'>
                <p className='flex items-center'>
                  <StarIcon className='h-4 text-red-400' />{room.guests - 0.3}
                </p>
                <p className='text-right font-semibold'>${room.price}/ đêm</p>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </>
    })
  }
  return (
    <>
      <Header />
      <div className='grid wide'>
        <div className='row'>
          <div className='col l-7 mf8-7 c-12'>
            <div className='room__text'>
              <h1 className='font-bold text-xl'>Chỗ ở khu vực bạn đã chọn</h1>
              <div className='flex'>
                <p className='buttonRoom hover:bg-red-400 hover:text-white transition all ease-lenear' >Loại nơi ở</p>
                <p className='buttonRoom hover:bg-red-400 hover:text-white transition all ease-lenear'>Giá</p>
                <p className='buttonRoom hover:bg-red-400 hover:text-white transition all ease-lenear'>Đặt ngay</p>
                <p className='buttonRoom hover:bg-red-400 hover:text-white transition all ease-lenear'>Phòng và phòng ngủ</p>
                <p className='buttonRoom hover:bg-red-400 hover:text-white transition all ease-lenear'>Bộ lọc khác</p>
              </div>
              <hr className='mt-3' />
            </div>
            <div className='room__content'>
              <div className='grid'>
                {renderRoom()}
              </div>
            </div>
          </div>
          <div className='col l-5 mf8-5 c-0'>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
