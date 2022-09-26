import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuIcon, UserCircleIcon} from "@heroicons/react/solid"



const AppHeader = () => {
  const [modalUser, setModalUser] = useState(false);
  const [modalLoginUser, setModalLoginUser] = useState(false);
  let user = JSON.parse(localStorage.getItem('user'))
    console.log(user);
  let navigate = useNavigate();


  
  const renderModalLoginUser = () => {
    return <div className='border-2 rounded-xl shadow-xl mt-5 bg-slate-50 p-2 fixed top-7 right-10'>
        <h1 onClick={() => {
            navigate(`information/${user._id}`)
        }} className='font-bold my-2 p-2 hover:bg-gray-300 rounded-md transition-all ease-linear'>Cập Nhập Thông Tin</h1>
        <h1 onClick={() => {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            window.location.href="/"
        }} className='font-bold my-2 p-2 hover:bg-gray-300 rounded-md transition-all ease-linear'>Đăng xuất</h1>
    </div>
  }
  return (
      <div className='adminHeader'>
          {user ? <div onClick={() => { setModalLoginUser(!modalLoginUser) }} className=' relative flex items-end border-solid border-2 rounded-full p-2 cursor-pointer  hover:shadow-md ease-in duration-200  '>
              <MenuIcon className='h-6 mr-1' />
              <img className='w-6 h-6 rounded-full object-cover' src={user && user.avatar ? user.avatar : 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'} />
              {modalLoginUser && renderModalLoginUser()}

          </div> : <div onClick={() => { setModalUser(!modalUser) }} className=' relative flex items-end border-solid border-2 rounded-full p-2 cursor-pointer  hover:shadow-md ease-in duration-200  '>
              <MenuIcon className='h-6 mr-1' />
              <UserCircleIcon className='h-6 text-gray-500' />
              {modalUser}
          </div>}
      </div>
  )
}

export default AppHeader
