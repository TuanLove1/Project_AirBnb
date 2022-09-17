import React, { useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import '../../../src/index.css'

import { fectDataRoom } from '../../pages/ListRoomPage/reducer/actions'
import { actFectDataCityInput } from '../../components/SearchInput/reducer/actions'
export const Header = () => {
    // let prop = []
    let prop = useSelector((state) => state.dataCiTyInputReducer)
    let dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const [modalUser, setModalUser] = useState(false);
    const [modalLoginUser, setModalLoginUser] = useState(false);
    let user = JSON.parse(localStorage.getItem('user'))
    let navigate = useNavigate();
    const renderInput = () => {
        return prop.data?.map((city, index) => {
            return <div onClick={() => {
                setSearchInput('')
                navigate(`/list-room/${city._id}`)
                dispatch(fectDataRoom(city._id))
            }} key={index} className='adress flex items-center my-2 ml-1 cursor-pointer hover:bg-gray-100  hover:scale-105 hover:shadow-xlrounded-md transition-all ease-linear'>
                <div className='w-8 h-8 mr-2 bg-gray-200 rounded-md p-2'>
                    <LocationMarkerIcon />
                </div>
                <div className='adress__text'>
                    <p >{city.name},{city.province}</p>
                </div>
            </div>
        })
    }
    const renderModalUser = () => {
        return <div className='border-2 rounded-xl shadow-xl mt-5 bg-slate-50 p-2 fixed top-7 right-10'>
            <h1 onClick={() => {
                navigate('/register')
            }} className='font-bold my-2 p-2 hover:bg-gray-300 rounded-md transition-all ease-linear'>Đăng ký</h1>
            <hr />
            <h1 onClick={() => {
                navigate('/login')
            }} className='p-2 hover:bg-gray-300 rounded-md transition-all ease-linear'>Đăng nhập</h1>
            <hr />
            <div className='my-3'>
                <h1 className='font-mono hover:bg-gray-300 rounded-md transition-all ease-linear mb-2 ml-2'>Tổ chức trải nghiệm</h1>
                <h1 className='font-mono hover:bg-gray-300 rounded-md transition-all ease-linear ml-2'>Trợ giúp ??</h1>
            </div>
        </div>
    }
    
    const renderModalLoginUser = () => {
        return <div className='border-2 rounded-xl shadow-xl mt-5 bg-slate-50 p-2 fixed top-7 right-10'>
            <h1 className='font-bold my-2 p-2 hover:bg-gray-300 rounded-md transition-all ease-linear'>Xin chào, {user.name}</h1>
            <hr />
            <div className='my-3'>
                <h1 className='font-mono hover:bg-gray-300 rounded-md transition-all ease-linear mb-2 ml-2'>Tổ chức trải nghiệm</h1>
                <h1 className='font-mono hover:bg-gray-300 rounded-md transition-all ease-linear ml-2'>Trợ giúp ??</h1>
            </div>
            <hr />
            <h1 onClick={() => {
                navigate(`information/${user._id}`)
            }} className='font-bold my-2 p-2 hover:bg-gray-300 rounded-md transition-all ease-linear'>Thông tin cá nhân</h1>
            <h1 onClick={() => {
                localStorage.removeItem('user')
                localStorage.removeItem('token')
            }} className='font-bold my-2 p-2 hover:bg-gray-300 rounded-md transition-all ease-linear'>Đăng xuất</h1>
        </div>
    }
    const handelonChange = (e) => {
        dispatch(actFectDataCityInput(e.target.value))
        setSearchInput(e.target.value)
    }

    return (
        <>
            <header className='sticky top-0 z-40 grid shadow-md p-4 bg-white '>
                {/* Left */}
                <div className='row flex items-center '>
                    <div className='col l-3 mf8-3 c-3'>
                        <div className='h-10 cursor-pointer my-auto flex items-center'>
                            <img onClick={() => {
                                navigate('/')
                            }} width={100} height={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' />
                        </div>
                    </div>
                    {/* Middle */}
                    <div className='col l-6 mf8-6 c-6'>
                        <form className='flex items-center border-2 rounded-full py-2  justify-between px-3 m-auto w-1/2 header__middle hover:shadow-md transition-all ease-linear'>
                            {/* <ul className='bg-red-500 flex'>
                            <li className='mr-1'>
                                <NavLink to='home'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='about'>About</NavLink>
                            </li>
                        </ul> */}
                            <input value={searchInput} onChange={handelonChange} className='placeholder-gray-400 text-gray-400 outline-none pl-5 bg-transparent search__mobile' type='text' placeholder='Bạn sắp đi đâu ?' />
                            <SearchIcon className='h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer' />
                        </form>
                        <div >
                            {searchInput &&
                                <div className='mx-auto bg-white searchInput '>
                                    {renderInput()}
                                </div>
                            }
                        </div>
                    </div>
                    {/* Right */}
                    <div className='col l-3 mf8-3 c-3'>
                        <div className='flex items-center header__right '>
                            <p className='mr-3 mb-0 cursor-pointer comehouse__mobile hover:bg-gray-100 rounded-full p-2 transition-all ease-linear '>Trở thành chủ nhà</p>
                            <GlobeAltIcon className='h-6  mr-3 cursor-pointer hover:shadow-2xl hover:bg-gray-400 hover:text-white rounded-full  transition-all ease-linear VI_ENG' />
                            {user ? <div onClick={() => { setModalLoginUser(!modalLoginUser) }} className=' relative flex items-end border-solid border-2 rounded-full p-2 cursor-pointer  hover:shadow-md ease-in duration-200  '>
                                <MenuIcon className='h-6 mr-1' />
                                <img className='w-6 h-6 rounded-full object-cover' src={user?.avatar || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} />
                                {modalLoginUser && renderModalLoginUser()}

                            </div> : <div onClick={() => { setModalUser(!modalUser) }} className=' relative flex items-end border-solid border-2 rounded-full p-2 cursor-pointer  hover:shadow-md ease-in duration-200  '>
                                <MenuIcon className='h-6 mr-1' />
                                <UserCircleIcon className='h-6 text-gray-500' />
                                {modalUser && renderModalUser()}
                            </div>}


                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}
