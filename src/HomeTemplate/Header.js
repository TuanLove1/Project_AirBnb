import React, { useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon, LocationMarkerIcon } from "@heroicons/react/solid"
import '../index.css'
import { actFectDataCity } from '../pages/HomePage/reducer/actions'
import { fectDataRoom } from '../pages/ListRoomPage/reducer/actions'
export const Header = () => {
    let prop = useSelector((state) => state.dataCiTyReducer)
    let dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    let navigate = useNavigate()
    // let params = useParams();
    // console.log(params.id);
    const renderInput = () => {
        return prop.data?.map((city, index) => {
            return <div key={index} className='adress flex items-center my-2 ml-1 cursor-pointer hover:bg-gray-100 rounded-md transition-all ease-linear'>
                <div className='w-8 h-8 mr-2 bg-gray-200 rounded-md p-2'>
                    <LocationMarkerIcon />
                </div>
                <div onClick={() => {
                    navigate(`/list-room/${city._id}`)
                    dispatch(fectDataRoom(city._id))
                }} className='adress__text'>
                    <p>{city.name},{city.province}</p>
                </div>
            </div>
        })
    }

    const handelonChange = (e) => {
        dispatch(actFectDataCity(e.target.value))
        setSearchInput(e.target.value)
    }
    return (
        <>
            <header className='sticky top-0 z-50 grid shadow-md p-4 bg-white'>
                {/* Left */}
                <div className='row flex items-center '>
                    <div className='col l-3 mf8-3 c-0'>
                        <div className='h-10 cursor-pointer my-auto'>
                            <img onClick={() => {
                                navigate('/')
                            }} width={100} height={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' />
                        </div>
                    </div>
                    {/* Middle */}
                    <div className='col l-6 mf8-6 c-12'>
                        <div className='flex items-center border-2 rounded-full py-2  justify-between px-3 m-auto w-1/2 header__middle hover:shadow-md transition-all ease-linear'>
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
                        </div>
                    </div>
                    {/* Right */}
                    <div className='col l-3 mf8-3 c-0'>
                        <div className='flex items-center header__right '>
                            <p className='mr-3 mb-0 cursor-pointer comehouse__mobile hover:bg-gray-100 rounded-full p-2 transition-all ease-linear '>Trở thành chủ nhà</p>
                            <GlobeAltIcon className='h-6 mr-3 cursor-pointer hover:shadow-2xl hover:bg-gray-400 hover:text-white rounded-full  transition-all ease-linear' />
                            <div className='flex items-end border-solid border-2 rounded-full p-2 cursor-pointer  hover:shadow-md ease-in duration-200  '>
                                <MenuIcon className='h-6 mr-1' />
                                <UserCircleIcon className='h-6 text-gray-500' />
                            </div>
                        </div>
                    </div>
                    <div className='grid wide'>
                        <div className='row'>
                            {searchInput &&
                                <div className='col l-6 mf8-6 c-12 mx-auto bg-white searchInput '>
                                    {renderInput()}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
