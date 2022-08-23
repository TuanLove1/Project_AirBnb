import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fectDataInformation } from './reducer/actions';
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import moment from 'moment';
import { fectDataImgInformation } from './reducerCapNhatImg/actions';
import { HistoryBookRoom } from '../../components/HistoryBookRoom/HistoryBookRoom';
const { TabPane } = Tabs;
export const Information = () => {

    const dispatch = useDispatch();
    const params = useParams()
    const prop = useSelector((state) => state.informationReducer)
    console.log(prop.data?._id);
    const propImg = useSelector((state) => state.informationImgReducer)
    const { loading } = propImg;
    let [image, setImage] = useState('')
    let [formData, setFormData] = useState(new FormData())
    useEffect(() => {
        dispatch(fectDataInformation(params.id))
    }, [])
    const handleOnChange = (e) => {
        let file = e.target.files[0];
        if (file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/jpg');
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImage(e.target.result)
        }
        formData.append('avatar', file)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData(formData)
        dispatch(fectDataImgInformation(formData))
    }
    if (loading) return <div style={{ backgroundColor: 'rgba(0,0,0,.5)', height: '100%', width: '100%', position: 'fixed', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '999' }} className=''>
        <ClipLoader color='rgb(248 113 113)' />
    </div>
    return (
        <div className='grid wide my-5'>
            <div className="row">
                <div className="col l-12 mf8-12 c-12 ">
                    <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
                        <TabPane tab="Thông tin tài khoản" key="1">
                            <div className='info__left'>
                                <div onSubmit={handleSubmit} className='row flex items-center border-2 p-4 my-4 rounded-md'>
                                    <form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='col l-3 mf8-3 c-12 info__mobie'>
                                        <div className='info__img border-2 text-gray-400 rounded-full w-44 h-44 flex items-center justify-center '>
                                            <img className='w-40 h-40 rounded-full object-cover' src={image = '' ? propImg.data?.avatar : image} alt='..' />
                                        </div>
                                        <input onChange={handleOnChange} type='file' accept='image/png,image/jpg,image/gìf,imgae/png' />
                                        <div className='mt-2'>
                                            <button type='submit' className='bg-red-400 p-1 rounded-md text-white buttonCapnhatImg'>Cập nhật ảnh đại diện</button>
                                        </div>
                                    </form>
                                    <div className='col l-9 mf8-9 c-12 bg-red-400 p-2 rounded-md'>
                                        <h1 className='text-center font-bold text-xl'>{prop.data?.name}</h1>
                                        <div className='info__content border-2 p-1 '>
                                            <h1>Email: {prop.data?.email}</h1>
                                        </div>
                                        <div className='info__content border-2 p-1 '>
                                            <h1>Password: ********</h1>
                                        </div>
                                        <div className='info__content  border-2 p-1'>
                                            <h1>Birhtday: {moment(prop.data?.birthday).format('DD/MM/YYYY')}</h1>
                                        </div>
                                        <div className='info__content  border-2 p-1'>
                                            <h1>Address: {prop.data?.address}</h1>
                                        </div>
                                        <div className='info__content border-2 p-1 '>
                                            <h1>Phone: {prop.data?.phone}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Lịch sử đặt phòng" key="2">
                            <HistoryBookRoom id={prop.data?._id}/>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        </div>

    )
}
