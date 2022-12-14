import React, { useEffect } from 'react'
import { Banner } from '../../templates/HomeTemplate/Banner';
import { useDispatch, useSelector } from 'react-redux'
import { actFectDataCity } from './reducer/actions';
import ClipLoader from "react-spinners/ClipLoader";
import SlickCarousel from "../../components/SlickCarousel/SlickeCarousel"
import { fectDataRoom } from '../ListRoomPage/reducer/actions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  // let prop = []
  let prop = useSelector((state) => state.dataCiTyReducer);
  let propDataRoom = useSelector((state) => state.dataRoomReducer)
  const [stateId,setStateId] = useState(
    '61697f97efe193001c0a5b69'
  )
  useEffect(() => {
    dispatch(actFectDataCity())
  }, [])
  useEffect(()=>{
    dispatch(fectDataRoom(stateId))
  },[stateId])
  let { data, loading } = prop;
  const renderHtmlRoom = () => {
    return propDataRoom.data?.splice(0,6).map((room,index)=>{
        return <div onClick={()=>{
          navigate(`/detail-room/${room._id}`)
        }} key={index} className='col l-4 mf8-6 c-12'>
            <div className='where hover:scale-105 hover:bg-gray-200 cursor-pointer rounded-md transition-all ease-linear mb-3'>
              <div className='where__img '>
                <img className='rounded-md w-full' src={room.image} />
              </div>
              <div className='where__text'>
                <p className='font-bold m-0'>{room.name}</p>
                <p className='font-bold  text-gray-400 m-0'>{room.locationId.name}, {room.locationId.province}</p>
                <p className='font-bold m-0 text-red-400'>{room.price} $</p>
              </div>
            </div>
          </div>
  })
  }
  const handleOnChangeId = (city) => {
    setStateId(city._id);
  }
  return (
    <>
      {loading ? <div style={{ backgroundColor: 'rgba(0,0,0,.5)', height: '100%', width: '100%', position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '999' }} className=''>
        <ClipLoader color='rgb(248 113 113)' />
      </div> : ''}
      {/* <Header /> */}
      <Banner />
      <>
        <section>
          <div className='grid wide'>
            <h1 className='text-3xl font-semibold pb-5 pt-5 text__main ml-2'>Kh??m ph?? nh???ng ??i???m ?????n g???n ????y</h1>
          </div>
          <div className='grid wide'>
            <div className='row'>
              {loading ? <ClipLoader color='rgb(248 113 113)' /> : <SlickCarousel handleOnChangeId={handleOnChangeId} data={data} loading={loading} />}
            </div>
          </div>
        </section>
        <section>
          <div className='grid wide'>
            <h1 className='text-3xl font-semibold pb-5 pt-5 text__main ml-2'>Hotel - Resort</h1>
          </div>
          <div className='grid wide'>
            <div className='row '>
              {renderHtmlRoom()}
              {/* <div className='col l-4 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img '>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>To??n b??? nh??</p>
                  </div>
                </div>
              </div> */}
              {/* <div className='col l-4 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Ch??? ??? ?????c ????o</p>
                  </div>
                </div>
              </div>
              <div className='col l-4 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Trang tr???i v?? thi??n nhi??n</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
        <section className='mb-5'>
          <div className='grid wide'>
            <h1 className='text-3xl font-semibold pb-5 pt-5 text__main ml-2'>??? b???t c??? ????u</h1>
          </div>
          <div className='grid wide'>
            <div className='row '>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img '>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/2f13349d-879d-43c6-83e3-8e5679291d53.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>To??n b??? nh??</p>
                  </div>
                </div>
              </div>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Ch??? ??? ?????c ????o</p>
                  </div>
                </div>
              </div>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Trang tr???i v?? thi??n nhi??n</p>
                  </div>
                </div>
              </div>
              <div className='col l-3 mf8-6 c-12'>
                <div className='where hover:scale-105 transition-all ease-linear'>
                  <div className='where__img'>
                    <img className='rounded-md' src='https://a0.muscache.com/im/pictures/10a638e1-6aff-4313-8033-1275cec83987.jpg?im_w=1440' />
                  </div>
                  <div className='where__text'>
                    <p className='font-bold mt-1'>Cho ph??p mang theo th?? c??ng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  )
}
