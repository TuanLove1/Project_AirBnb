import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import "./HistoryBookRoom.css"
import { fectDataHistoryBookRoom } from './reducer/actions';
import moment from 'moment';
export const HistoryBookRoom = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const prop = useSelector((state) => state.historyBookReducer)
  console.log(prop.data);
  const renderHistoryBook = () => {
    return prop.data?.map((history, index) => {
      return <tr key={index}>
        <td className='font-bold'>{index+1}</td>
        <td>
          <img className='w-15 h-10' src={history.roomId.image}/>
        </td>
        <td>{history.roomId.name}</td>
        <td>{moment(history.checkIn).format('DD/MM/YYYY')}</td>
        <td>{moment(history.checkOut).format('DD/MM/YYYY')}</td>
        <td className='font-bold'>{history.roomId.price}</td>
      </tr>
    })
  }
  useEffect(() => {
    dispatch(fectDataHistoryBookRoom(id))
  }, [])
  return (
    <div className='grid wide'>
      <div className='row'>
        <div style={{display:'flex',justifyContent:'center'}} className='col l-12 mf8-12 c-12 mt-4'>
          <table>
            <thead>
              <tr className='bg-red-400 text-white'>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên Khách Sạn</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {renderHistoryBook()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
