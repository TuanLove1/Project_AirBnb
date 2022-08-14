import { CubeIcon, CubeTransparentIcon, DesktopComputerIcon, ShareIcon, StarIcon, WifiIcon } from '@heroicons/react/solid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Booking } from '../../HomeTemplate/Booking'
import { Evaluate } from '../../HomeTemplate/Evaluate'
import { Footer } from '../../HomeTemplate/Footer'
import { Header } from '../../HomeTemplate/Header'
import { actFectDetailRoom } from './reducer/actions'

export const DetailRoom = () => {
    let dispatch = useDispatch();
    let prop = useSelector((state) => state.detailRoomReducer);
    let params = useParams()
    useEffect(() => {
        dispatch(actFectDetailRoom(params.id))
    }, [])
    const { data} = prop;
    return (
        <>
            <Header />
            <div className='grid wide'>
                <h1 className='my-3 font-bold'>{data?.name}</h1>
                <div className='row flex justify-between'>
                    <div className='col l-8 mf8-8 c8'>
                        <div className='detail__rating flex items-center '>
                            <StarIcon className='w-6 h-6 text-red-400' />
                            <span className='text-gray-400'>({data?.locationId.valueate} đánh giá) -</span>
                            <span className='text-gray-400'> Chủ nhà siêu cấp -</span>
                            <span className='text-gray-400'> {data?.locationId.province},{data?.locationId.country}  </span>
                        </div>
                    </div>
                    <div className='col l-2 mf2-2 c2'>
                        <div className='detail__icon flex items-center space-x-2'>
                            <div className='cursor-pointer flex space-x-2'>
                                <ShareIcon className="h-6 w-6 cursor-pointer hover:text-red-400 transition-all ease-linear" />
                                <span className='hover:font-bold transition-all ease-linear'>Chia sẽ</span>
                            </div>
                            <div className='cursor-pointer flex space-x-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer hover:text-red-400 transition-all ease-linear" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className='hover:font-bold transition-all ease-linear'>Lưu</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail__img mt-3'>
                    <div className='row'>
                        <div className='col l-6 mf8-6 c-12'>
                            <img className='w-100 h-100 cursor-pointer rounded-xl hover:scale-105 transition-all ease-linear' src={data?.image} />
                        </div>
                        <div className='col l-3 mf8-3 c-0'>
                            <img className='w-100 h-49 cursor-pointer rounded-xl hover:scale-105 transition-all ease-linear' src='https://a0.muscache.com/im/pictures/84890a2b-d3e0-4ffe-8f61-13bcc4819ee9.jpg?im_w=720' />
                            <img className='w-100 h-49 mt-3 cursor-pointer rounded-xl  hover:scale-105 transition-all ease-linear' src='https://a0.muscache.com/im/pictures/783acc04-3e52-4ec2-9562-b470265e21b1.jpg?im_w=720' />
                        </div>
                        <div className='col l-3 mf8-3 c-0'>
                            <img className='w-100 h-49 cursor-pointer rounded-xl  hover:scale-105 transition-all ease-linear' src='https://a0.muscache.com/im/pictures/7407bdfd-d3a9-4d28-8c89-842337751d0a.jpg?im_w=720' />
                            <img className='w-500 h-49 mt-3 cursor-pointer rounded-xl hover:scale-105 transition-all ease-linear' src='https://a0.muscache.com/im/pictures/2e6de11b-b090-468b-baf6-500acda79334.jpg?im_w=720' />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col l-7 mf8-7 c-12'>
                        <div className='detail__allhome mt-5'>
                            <h1 className='font-bold'>Toàn bộ căn hộ condo. Chủ nhà Phong</h1>
                            <p>{data?.guests} khách - {data?.bedRoom} phòng ngủ - 2 giường - {data?.bath} phòng tắm</p>
                            <hr className='mt-3' />
                        </div>
                        <div className='detail__homeicon flex items-center mt-3'>
                            <div className='mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='font-bold'>Toàn bộ nhà</h2>
                                <p className='text-gray-400'>Bạn sẽ có chung cư cao cấp cho riêng mình</p>
                            </div>
                        </div>
                        <div className='detail__homeicon flex items-center mt-3'>
                            <div className='mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='font-bold'>Vệ sinh tăng cường</h2>
                                <p className='text-gray-400'>Chủ nhà này đã cam kết thực hiện vệ sinh tăng cường 5 bước AirBnb</p>
                            </div>
                        </div>
                        <div className='detail__homeicon flex items-center mt-3'>
                            <div className='mr-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className='font-bold'>Phong là chủ nhà siêu cấp</h2>
                                <p className='text-gray-400'>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm được đánh giá cao và là những người cam kết mang lại quãng thời gian tuyệt vời cho quý khách</p>
                            </div>
                        </div>
                        <hr className='my-3' />
                        <p>Mô tả : {data?.description}</p>
                        <hr className='my-3'></hr>
                        <h1 className='font-bold mb-3'>Tiện nghi</h1>
                        <div className='row'>
                            <div className='col l-6 mf8-6 c-6'>
                                {data?.wifi && <div className='flex mb-2'>
                                    <WifiIcon className='w-6 h-6 mr-2' /><span>Wifi </span>
                                </div>}
                                {data?.indoorFireplace && <div className='flex mb-2'>
                                    <CubeTransparentIcon className='w-6 h-6 mr-2' /><span>Điều hòa nhiệt độ</span>
                                </div>}
                                {data?.cableTV && <div className='flex'>
                                    <DesktopComputerIcon className='w-6 h-6 mr-2' /><span>Ti vi</span>
                                </div>}
                            </div>
                            <div className='col l-6 mf8-6 c-6'>
                                {data?.pool && <div className='flex mb-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg><span>Bồn tắm</span>
                                </div>}
                                {data?.hotTub && <div className='flex'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                    </svg><span>Tủ lạnh</span>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className='col l-5 mf8-5 c-12'>
                        <Booking params={params} data={data} />
                    </div>
                </div>
                <hr className='my-3' />
            </div>
            <Evaluate params={params} />
            <Footer />
        </>
    )
}
