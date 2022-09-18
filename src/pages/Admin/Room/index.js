import React, { useState, useEffect } from "react"
import {
    CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell,
    CTableHead, CTableHeaderCell, CTableRow, CButton, CPagination, CPaginationItem 
} from '@coreui/react'
import _ from 'lodash'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'
import CreateRoomComponent from './create'
import ViewRoomComponent from './view'
import EditRoomComponent from './edit'
import DeleteRoomComponent from "./delete"
import Select from 'react-select'

const initPayload = {
    room: '',
    limit: 20,
    skip: 0,
    orderBy: 1,
    orderName: '',
    groupName: ''
}
const RoomComponent = () => {
    const handleFilterBySelectLocation= (event) => {
        setSearchRoom(event.value);
        console.log(event.value)
     }
    const handleSearch = () => { 
        fetchRooms()
    }
    const [rooms, setRooms] = useState(null)
    const [currentPayload, setCurrentPayload] = useState(initPayload)
    const [visibleCreate, setVisibleCreate] = useState(false)
    const [visibleView, setVisibleView] = useState({ visible: false, id: null })
    const [visibleEdit, setVisibleEdit] = useState({ visible: false, id: null })
    const [visibleDelete, setVisibleDelete] = useState ({visible : false, id: null})
    const [searchRoom, setSearchRoom] = useState('')
    const [locationOptions, setLocationOptions] = useState(null)
    const [currentPageNumber, setCurrentPageNumber] = useState (1)

    useEffect(() => {
        sendHttpRequestMessage(currentPayload, methodType.GET, `/rooms`)
            .then(response => { setRooms(response) })
            .catch(error => { console.log("Lỗi hệ thộng") })
        sendHttpRequestMessage({}, methodType.GET, `/locations`)
            .then(response => {
                let options = [{
                    value: "",
                    label: "Tất Cả"
                }]
                if (response) {
                    _.forEach(response, (item) => {
                        options.push({
                            value: item._id,
                            label: item.name
                        })
                    })
                }
                setLocationOptions(options)
                console.log("locationOptions", options)
            })
            .catch(error => { console.log("Lỗi hệ thộng") })
    }, [])

    const fetchRooms = async () => {
        currentPayload.locationId = searchRoom;
        return await sendHttpRequestMessage(currentPayload, methodType.GET, `/rooms`)
            .then(response => { setRooms(response) })
            .catch(error => Promise.reject(error))
    }
    console.log(rooms)
    const renderBodyTable = () => {
        return rooms && rooms.map((room, index) => {
            return (
                <CTableRow key={index}>
                    <CTableDataCell style={{justifyContent : 'center', textAlign :'center'}}>{index + 1}</CTableDataCell>
                    <CTableDataCell style={{justifyContent : 'center', textAlign :'center'}}>{room.name}</CTableDataCell>
                    <CTableDataCell style={{justifyContent : 'center', textAlign :'center'}}><img src={room.image} /></CTableDataCell>
                    <CTableDataCell>{room.locationId?.name}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center', justifyContent : 'center'}}>{room.guests}</CTableDataCell>
                    <CTableDataCell style={{paddingLeft :'17px', paddingTop: '30px'}}>
                        <button className="btn" type="button" onClick={() => setVisibleView({ visible: true, id: room._id })}
                            style={{ border: '1px solid black', background: '#1890ff', color: 'white', marginLeft :'15px' }}>
                            Chi tiết
                        </button>
                        <button className="btn" type="button" onClick={() => setVisibleEdit({ visible: true, id: room._id })}
                            style={{ border: '1px solid black', background: 'green', color: 'white', marginLeft :'15px' }}>
                            Sửa
                        </button>
                        <button className="btn" type="button" onClick={() => setVisibleDelete({ visible: true, id: room._id })}
                            style={{ border: '1px solid black', background: 'red', color: 'white', marginLeft :'15px' }}>
                            Xóa
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
    const onCloseDelete = async () => {
        fetchRooms()
        setVisibleDelete({ visible: false, id: null })
    }

    const handleNextPaginationUser = () => {

        let newPageNumber = currentPageNumber + 1;
        setCurrentPageNumber(newPageNumber);
        let skip = (newPageNumber-1)*20;
        currentPayload.skip = skip;
        setCurrentPayload(currentPayload);
        fetchRooms()
    }

    const handlePrevPaginationUser = () => {
        let newPageNumber = currentPageNumber - 1;
        if (newPageNumber <= 0) {
            return
        }
        setCurrentPageNumber(newPageNumber);
        let skip = (newPageNumber-1)*20;
        currentPayload.skip = skip;
        setCurrentPayload(currentPayload);
        fetchRooms()
    }

    return (
        <>
            <CCard className="card mb-4 ccard-content">
                <CCardHeader className="bg-primary" style={{color: "white", fontWeight: '600'}}>DANH SÁCH PHÒNG</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm={4}>
                                    {
                                        locationOptions && locationOptions.length ? <Select options={locationOptions}
                                        onChange={handleFilterBySelectLocation} /> : ""
                                    }
                        </CCol>
                        <CCol sm={5} lg={3} style={{ textAlign: 'left' }} className='mb-3'>
                            <CButton color="primary"
                                onClick={handleSearch}
                                className="btn-add bg-sky-500 hover:bg-sky-700"> Tìm kiếm</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={12} className="col-row-add mb-3" style={{ textAlign: 'right' }}>
                            <CButton color="primary" size="sm" className="btn-ad" style={{ background: '#8A2BE2' }}  onClick={() => setVisibleCreate(!visibleCreate)}>
                            Thêm mới</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <div className="table-responsive">
                            <CCol xs={12}>  
                                <CTable className="table table-hover table-striped">
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell style={{ width: '2%' , textAlign :"center"}}>STT</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '20%', textAlign :"center" }}>Tên phòng</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '10%', textAlign :"center" }}>Hình ảnh</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '16%', textAlign :"center" }}>Vị trí</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '7%' , textAlign :"center"}}>Số khách</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '20%', textAlign :"center" }}>Chức Năng</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {renderBodyTable()}
                                    </CTableBody>
                                </CTable>
                                <CPagination aria-label="Page navigation example">
                                    <CPaginationItem onClick={handlePrevPaginationUser} disabled = {currentPageNumber === 1}>Trước</CPaginationItem>
                                    <CPaginationItem onClick={handleNextPaginationUser}>Sau</CPaginationItem>
                                </CPagination>
                            </CCol>
                        </div>
                    </CRow>
                </CCardBody>
            </CCard>
            {visibleCreate && <CreateRoomComponent
                visibleCreate={visibleCreate}
                onCloseCreate={onCloseCreate} />}
            {visibleView.visible && <ViewRoomComponent visible={visibleView.visible}
                onClose={onCloseView} id={visibleView.id} />}
            {visibleEdit.visible && <EditRoomComponent visibleEdit={visibleEdit.visible}
                id={visibleEdit.id} onCloseEdit={onCloseEdit} />}
            {visibleDelete.visible && <DeleteRoomComponent visibleDelete={visibleDelete.visible}
                id={visibleDelete.id} onCloseDelete={onCloseDelete} />}        
        </>
    )
}

export default RoomComponent