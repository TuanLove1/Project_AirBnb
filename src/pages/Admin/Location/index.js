import React, { useState, useEffect } from "react"
import {
    CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell,
    CTableHead, CTableHeaderCell, CTableRow, CButton, CFormInput, CPagination, CPaginationItem
} from '@coreui/react'
import _ from 'lodash'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'
import CreateLocationComponent from './create'
import ViewLocationComponent from './view'
import EditLocationComponent from './edit'  
import DeleteLocationComponent from "./delete"

const initPayload = {
    location: '',
    limit: 20,
    skip: 0,
    orderBy: 1,
    orderName: '',
    groupName: ''
}
const LocationComponent = () => {
    const handleFilterByKeyword = (event) => {
        setSearchLocation(event.target.value);
     }
    const handleSearch = (event) => { 
        fetchLocations()
    }
    const [locations, setLocation] = useState(null)
    const [currentPayload, setCurrentPayload] = useState(initPayload)
    const [visibleCreate, setVisibleCreate] = useState(false)
    const [visibleView, setVisibleView] = useState({ visible: false, id: null })
    const [visibleEdit, setVisibleEdit] = useState({ visible: false, id: null })
    const [visibleDelete, setVisibleDelete] = useState ({visible : false, id: null})
    const [searchLocation, setSearchLocation] = useState('')
    const [currentPageNumber, setCurrentPageNumber] = useState (1)

    useEffect(() => {
        sendHttpRequestMessage(currentPayload, methodType.GET, `/locations`)
            .then(response => { setLocation(response) })
            .catch(error => { console.log("Lỗi hệ thống") })
    }, [])

    const fetchLocations = async () => {
        currentPayload.location = searchLocation;
        return await sendHttpRequestMessage(currentPayload, methodType.GET, `/locations`)
            .then(response => { setLocation(response) })
            .catch(error => Promise.reject(error))
    }
    console.log(locations)
    const renderBodyTable = () => {
        return locations && locations.map((location, index) => {
            return (
                <CTableRow key={index}>
                    <CTableDataCell style={{textAlign :"center"}}>{index + 1}</CTableDataCell>
                    <CTableDataCell>{location.name}</CTableDataCell>
                    <CTableDataCell>{location.province}</CTableDataCell>
                    <CTableDataCell>{location.country}</CTableDataCell>
                    <CTableDataCell className="feature_location" style={{paddingLeft :'28px'}}>
                        <button className="btn" type="button" onClick={() => setVisibleView({ visible: true, id: location._id })}
                            style={{ border: '1px solid black', background: '#1890ff', color: 'white', marginLeft :'15px' }}>
                            Chi tiết
                        </button>
                        <button className="btn" type="button" onClick={() => setVisibleEdit({ visible: true, id: location._id })}
                            style={{ border: '1px solid black', background: 'green', color: 'white', marginLeft :'15px' }}>
                            Sửa
                        </button>
                        <button className="btn" type="button" onClick={() => setVisibleDelete({ visible: true, id: location._id })}
                            style={{ border: '1px solid black', background: 'red', color: 'white', marginLeft :'15px' }}>
                            Xóa
                        </button>
                    </CTableDataCell>
                </CTableRow>
            )
        })
    }
    const onCloseCreate = async () => {
        fetchLocations()
        setVisibleCreate(!visibleCreate)
    }
    const onCloseView = () => {
        setVisibleView({ visible: false, id: null })
    }
    const onCloseEdit = async () => {
        fetchLocations()
        setVisibleEdit({ visible: false, id: null })
    }
    const onCloseDelete = async () => {
        fetchLocations()
        setVisibleDelete({ visible: false, id: null })
    }

    const handleNextPaginationUser = () => {

        let newPageNumber = currentPageNumber + 1;
        setCurrentPageNumber(newPageNumber);
        let skip = (newPageNumber-1)*20;
        currentPayload.skip = skip;
        setCurrentPayload(currentPayload);
        fetchLocations()
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
        fetchLocations()
    }

    return (
        <>
            <CCard className="card mb-4 ccard-content">

                <CCardHeader className="bg-primary" style={{color: "white", fontWeight: '600'}}>DANH SÁCH VỊ TRÍ</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol sm={4} lg={3} className='mb-3'>
                            <CFormInput type="text" onChange={handleFilterByKeyword} placeholder="Nhập thông tin cần tìm" />
                        </CCol>
                        <CCol sm={5} lg={3} style={{ textAlign: 'left' }} className='mb-3'>
                            <CButton color="primary"
                                onClick={handleSearch}
                                className="btn-add bg-sky-500 hover:bg-sky-700 search"> Tìm kiếm</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol xs={12} className="col-row-add mb-3" style={{ textAlign: 'right' }}>
                            <CButton color="primary" size="sm" className="btn-add" style={{ background: "#8A2BE2" }} onClick={() => setVisibleCreate(!visibleCreate)}>
                                Thêm mới</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <div className="table-responsive">
                            <CCol xs={12}>
                                <CTable className="table table-hover table-striped">
                                    <CTableHead>
                                        <CTableRow className="title_table">
                                            <CTableHeaderCell style={{ width: '5%' , textAlign :"center"}}>STT</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '25%', textAlign :"center" }}>Tên vị trí</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '20%', textAlign :"center" }}>Tỉnh/Thành</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '10%', textAlign :"center" }}>Quốc gia</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '25%', textAlign :"center" }}>Chức năng</CTableHeaderCell>
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
            {visibleCreate && <CreateLocationComponent
                visibleCreate={visibleCreate}
                onCloseCreate={onCloseCreate} />}
            {visibleView.visible   && <ViewLocationComponent visible={visibleView.visible} 
            onClose={onCloseView} id={visibleView.id} />}
            {visibleEdit.visible   && <EditLocationComponent visibleEdit={visibleEdit.visible}  
            onCloseEdit={onCloseEdit} id={visibleEdit.id} />}
            {visibleDelete.visible && <DeleteLocationComponent visibleDelete={visibleDelete.visible} 
            onCloseDelete={onCloseDelete} id={visibleDelete.id}/>}    
        </>
    )
}

export default LocationComponent