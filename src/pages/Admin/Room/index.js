import React, { useState, useEffect } from "react"
import {
    CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell,
    CTableHead, CTableHeaderCell, CTableRow, CButton, CFormInput
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'
import CreateRoomComponent from './create'
import ViewUserComponent from './view'
import EditRoomComponent from './edit'
const initPayload = {
    limit: 20,
    skip: 1,
    orderBy: 1,
    orderName: '',
    groupName: ''
}
const RoomComponent = () => {
    const handleFilterByKeyword = (event) => { }
    const handleSearch = (event) => { }
    const [rooms, setRooms] = useState(null)
    const [currentPayload, setCurrentPayload] = useState(initPayload)
    const [visibleCreate, setVisibleCreate] = useState(false)
    const [visibleView, setVisibleView] = useState({ visible: false, id: null })
    const [visibleEdit, setVisibleEdit] = useState({ visible: false, id: null })

    useEffect(() => {
        sendHttpRequestMessage(currentPayload, methodType.GET, `/rooms`)
            .then(response => { setRooms(response) })
            .catch(error => { console.log("Lỗi hệ thộng") })
    }, [])

    const fetchRooms = async () => {
        return await sendHttpRequestMessage(currentPayload, methodType.GET, `/rooms`)
            .then(response => { setRooms(response) })
            .catch(error => Promise.reject(error))
    }
    console.log(rooms)
    const renderBodyTable = () => {
        return rooms && rooms.map((room, index) => {
            return (
                <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{room.name}</CTableDataCell>
                    <CTableDataCell><img style={{width: '85px'}} src={room.image} /></CTableDataCell>
                    <CTableDataCell>{room.locationId?.name}</CTableDataCell>
                    <CTableDataCell>{room.guests}</CTableDataCell>
                    <CTableDataCell>
                        <button type="button" onClick={() => setVisibleView({ visible: true, id: room._id })}
                            style={{ border: 'none', background: 'none', color: '#1890ff' }}>
                            <i className='fa fa-info-circle' />
                        </button>
                        <button type="button" onClick={() => setVisibleEdit({ visible: true, id: room._id })}
                            style={{ border: 'none', background: 'none', color: '#1890ff' }}>
                            <i className='fa fa-cog' />
                        </button>
                    </CTableDataCell>
                </CTableRow>
            )
        })
    }
    const onCloseCreate = async () => {
        fetchRooms()
        setVisibleCreate(!visibleCreate)
    }
    const onCloseView = () => {
        setVisibleView({ visible: false, id: null })
    }
    const onCloseEdit = async () => {
        fetchRooms()
        setVisibleEdit({ visible: false, id: null })
    }
    return (
        <>
            <CCard className="card mb-4 ccard-content">
                <CCardHeader>DANH SÁCH PHÒNG</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm={4} lg={3} className='mb-3'>
                            <CFormInput type="text" onChange={handleFilterByKeyword} placeholder="Nhập thông tin cần tìm" />
                        </CCol>
                        <CCol sm={5} lg={3} style={{ textAlign: 'left' }} className='mb-3'>
                            <CButton color="success"
                                onClick={handleSearch}
                                className="btn-add"> Tìm kiếm</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={12} className="col-row-add mb-3" style={{ textAlign: 'right' }}>
                            <CButton color="success" size="sm" className="btn-add" onClick={() => setVisibleCreate(!visibleCreate)}>
                                <i className="fa fa-plus"></i> Thêm mới</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <div className="table-responsive">
                            <CCol xs={12}>
                                <CTable className="table table-hover table-striped">
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell>STT</CTableHeaderCell>
                                            <CTableHeaderCell>Tên phòng</CTableHeaderCell>
                                            <CTableHeaderCell>Hình ảnh</CTableHeaderCell>
                                            <CTableHeaderCell>Vị trí</CTableHeaderCell>
                                            <CTableHeaderCell>Số khách</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '12%' }}>Chức năng</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {renderBodyTable()}
                                    </CTableBody>
                                </CTable>
                            </CCol>
                        </div>
                    </CRow>
                </CCardBody>
            </CCard>
            {visibleCreate && <CreateRoomComponent
                visibleCreate={visibleCreate}
                onCloseCreate={onCloseCreate} />}
            {visibleView.visible && <ViewUserComponent visible={visibleView.visible}
                onClose={onCloseView} id={visibleView.id} />}
            {visibleEdit.visible && <EditRoomComponent visibleEdit={visibleEdit.visible}
                id={visibleEdit.id} onCloseEdit={onCloseEdit} />}
        </>
    )
}

export default RoomComponent