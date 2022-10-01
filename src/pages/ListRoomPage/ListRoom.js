import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fectDataRoom } from './reducer/actions';
import { StarIcon } from '@heroicons/react/solid';
import { ClipLoader } from 'react-spinners';
export const ListRoom = () => {
  const dispatch = useDispatch()
  const prop = useSelector((state) => state.dataRoomReducer)
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fectDataRoom(params.id))
  }, [])
  const { data, loading } = prop;
  const renderRoom = () => {
    if (loading) return <ClipLoader className='text-red-400' color="#ef7983" />
    return data?.map((room, index) => {
      return <>
        <div onClick={() => {
          navigate(`/detail-room/${room._id}`)
        }} className='row flex cursor-pointer  mt-3 hover:scale-105 hover:shadow-xl transition-all ease-linear '>
          <div key={index} className='col l-4 mf8-4 c-4'>
            <div className='room__img'>
              <img className='w-100 h-100 rounded-xl' src={room.image} />
            </div>
          </div>
          <div className='col l-8 mf8-8 c-8'>
            <div className='room__info'>
              <div className='flex justify-between'>
                <p>Toàn bộ căn hộ dịch vụ tại {room.locationId.province}</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:text-red-400 transition-all ease-linear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      {/* <Header /> */}

      <div className='grid wide'>
        <div className='row'>
          <div className='col l-7 mf8-12 c-12'>
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
          <div className='col l-5 mf8-0 c-0'>
            <iframe style={{width:'100%',height:'100%'}} id="gmap_canvas" src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><br /><style dangerouslySetInnerHTML={{__html: ".mapouter{position:relative;text-align:right;height:500px;width:702px;}" }} /><style dangerouslySetInnerHTML={{__html: ".gmap_canvas {overflow:hidden;background:none!important;height:500px;width:702px;}" }} />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
