import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { Footer } from '../../templates/HomeTemplate/Footer'
import { Header } from '../../templates/HomeTemplate/Header'
import { actRegisterAirBnb } from './reducer/actions'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { ClipLoader } from 'react-spinners'

export const Register = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.registerAirBnbReducer)

    const [state, setState] = useState({
        // name: '',
        // email: '',
        // password: '',
        // phone: '',
        // birthday: '',
        // gender: true,
        // address: '',
        value: {
            name: '',
            email: '',
            password: '',
            phone: '',
            birthday: '',
            gender: true,
            address: '',
        },
        error: {
            name: '',
            email: '',
            password: '',
            phone: '',
            birthday: '',
            address: '',
        }

    });

    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        const { error } = state;
        for (let key in error) {
            if (error[key] !== '') {
                return;
            }
        }
        dispatch(actRegisterAirBnb(state.value, navigate))
    }
    const handleOnchange = (event) => {
        let { value, id } = event.target;
        // event.target['data-type']
        let type = event.target.getAttribute('data-type');
        let minLength = event.target.getAttribute('data-minlength');
        let maxLength = event.target.getAttribute('data-maxlength');

        // debugger;

        //Đưa giá trị state.value ra 1 biến
        let newValue = { ...state.value };
        newValue[id] = value;

        // debugger;
        //xử lý cho state.error
        let newError = { ...state.error };
        let messError = '';
        if (value.trim() === '') {
            messError = id + ' không được bỏ trống !';
        } else {
            if (type === 'emailType') {
                let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!regexEmail.test(value)) {
                    //có dấu ! phủ định
                    messError = id + ' không đúng định dạng !';
                }
            }
            if (minLength) {
                if (value.length > maxLength || value.length < minLength) {
                    messError = `${id} từ ${minLength} - ${maxLength} ký tự !`;
                }
            }
        }
        setState({
            value: newValue, //object literal - dynamic key
            error: newError
        })
        newError[id] = messError;
        // const { name, value } = event.target;
        // setState({
        //     ...state,
        //     [name]: value,
        // });
    };
    if (localStorage.getItem("user"))
        return <Navigate replace to="/" />;
    return (
        <div>
            {loading ? <div style={{ backgroundColor: 'rgba(0,0,0,.5)', height: '100%', width: '100%', position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '999' }} className=''>
                <ClipLoader color='rgb(248 113 113)' />
            </div> : ''}
            <div style={{ backgroundImage: `url('https://blog.atairbnb.com/wp-content/uploads/2015/09/SummerTravelHeader-1600x900.001.jpg?fit=1600%2C900')`, backgroundSize: 'cover', padding: '50px' }} className=''>

                <form onSubmit={handleSubmit} className='border-2  bg-gray-100  w-96 mx-auto p-10 rounded-xl shadow-xl hover:border-black transition ease-linear cursor-pointer form__mobile'>
                    <h1 className='text-center font-bold text-2xl mb-3 text-red-400'>Đăng ký</h1>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label >Name</label>
                        <input name='name' onChange={handleOnchange} className="form-control" id="name" />
                        <p className='text-danger'>{state.error.name}</p>
                    </div>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label htmlFor="email">Email</label>
                        <input data-type={"emailType"} name='email' onChange={handleOnchange} type="email" className="form-control" id="email" />
                        <p className='text-danger'>{state.error.email}</p>

                    </div>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label htmlFor="pwd">Mật khẩu</label>
                        <input data-minlength="6" data-maxlength="32" name='password' onChange={handleOnchange} className="form-control" type="password" id="password" />
                        <p className='text-danger'>{state.error.password}</p>
                    </div>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label >Phone</label>
                        <input name='phone' onChange={handleOnchange} className="form-control" id="phone" />
                        <p className='text-danger'>{state.error.phone}</p>
                    </div>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label >Ngày/tháng/năm sinh</label>
                        <input type='date' name='birthday' onChange={handleOnchange} className="form-control" id="birthday" />
                    </div>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label >Giới tính</label>
                        <div className='flex '>
                            <input onChange={handleOnchange} type="radio" name="gender" /><span className='mr-3'>Nam</span>
                            <input onChange={handleOnchange} type="radio" name="gender" /><span>Nữ</span>
                        </div>
                    </div>
                    <div className="form-group w-80 mx-auto form__inputmobile">
                        <label >Địa chỉ</label>
                        <input name='address' onChange={handleOnchange} className="form-control" id="address" />
                        <p className='text-danger'>{state.error.address}</p>
                    </div>
                    <div>
                        <button className='btn-76 bg-red-400 w-full rounded-xl text-white mb-2 p-2'>Đăng ký</button>
                    </div>
                </form>
            </div>
        </div >
    )
}
