import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Footer } from '../../templates/HomeTemplate/Footer'
import { Header } from '../../templates/HomeTemplate/Header'
import { actLoginAirBnb } from './reducer/actions'

export const Login = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const { loading,error } = useSelector((state) => state.loginAirBnbReducer)
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(actLoginAirBnb(state, navigate))
    }
    const handleOnchange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };
    const renderNoti = () => {
       return  error &&<div className='text-danger text-sm mb-2'> Mật khẩu hoặc tài khoản không chính xác!</div>
                 
    }
    if (localStorage.getItem("user"))
        return <Navigate replace to="/" />;
    return (
        <div>
            {loading ? <div style={{ backgroundColor: 'rgba(0,0,0,.5)', height: '100%', width: '100%', position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '999' }} className=''>
                <ClipLoader color='rgb(248 113 113)' />
            </div> : ''}
            <div style={{ backgroundImage: `url('https://blog.atairbnb.com/wp-content/uploads/2015/09/SummerTravelHeader-1600x900.001.jpg?fit=1600%2C900')`, backgroundSize: 'cover', padding: '50px', backgroundPosition: 'center' }} className=''>
                <form onSubmit={handleSubmit} className='border-2 bg-gray-100 w-96 mx-auto p-10 rounded-xl shadow-xl form__mobile'>
                    <h1 className='text-center font-bold text-2xl mb-3 text-red-400'>Đăng nhập</h1>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label htmlFor="email">Email</label>
                        <input name='email' onChange={handleOnchange} type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label htmlFor="pwd">Mật khẩu</label>
                        <input name='password' onChange={handleOnchange} className="form-control" type="password" id="pwd" />
                    </div>
                    {renderNoti()}
                    <div>
                        <button className='btn-76 bg-red-400 w-full rounded-xl text-white mb-2 p-2'>Login</button>
                    </div>
                    <p>Bạn chưa có tài khoản???. <span onClick={() => {
                        navigate('/register')
                    }} className='cursor-pointer text-blue-500 hover:text-red-400 transition-all ease-linear'>Đăng ký</span></p>
                </form>
            </div>
        </div>
    )
}
