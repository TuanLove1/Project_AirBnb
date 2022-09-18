import React, { useState, useEffect } from "react"
import {
    CCard, CCardBody, CCardHeader, CCol, CRow, CPaginationItem, CTableBody, CTableDataCell,
    CTableHead, CTableHeaderCell, CTableRow, CButton, CPagination,
} from '@coreui/react'
import _ from 'lodash'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'
import CreateUserComponent from './create'
import ViewUserComponent from './view'
import EditUserComponent from './edit'
import DeleteUserComponent from "./delete"
const initPayload = {
    user:'',
    limit: 20,
    skip : 0,
    orderBy: 1,
    orderName: '',
    groupName: ''
}
const UserComponent = () => {
   
    const [users, setUsers] = useState(null)
    const [currentPayload, setCurrentPayload] = useState(initPayload)
    const [visibleCreate, setVisibleCreate] = useState(false)
    const [visibleView, setVisibleView] = useState({ visible: false, id: null })
    const [visibleEdit, setVisibleEdit] = useState({ visible: false, id: null })
    const [visibleDelete, setVisibleDelete] = useState ({visible : false, id: null})
    const [currentPageNumber, setCurrentPageNumber] = useState (1)

    useEffect(() => {
        sendHttpRequestMessage(currentPayload, methodType.GET, `/users/pagination`)
            .then(response => { setUsers(response) })
            .catch(error => { console.log("Lỗi hệ thộng") })
    }, [])

    const fetchUsers = async () => {
        return await sendHttpRequestMessage(currentPayload, methodType.GET, `/users/pagination`)
            .then(response => { setUsers(response) })
            .catch(error => Promise.reject(error))
    }
    const renderBodyTable = () => {
        return users && users.map((user, index) => {
            return (
                <CTableRow key={index}>
                    <CTableDataCell style={{ textAlign: 'center' }}>{index + 1}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'left' }}>{user.name}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>{user.email}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>{user.phone}</CTableDataCell>
                    <CTableDataCell style={{ textAlign: 'center' }}>{user.address}</CTableDataCell>
                    <CTableDataCell style={{ paddingLeft :'25px'}}>
                        <button className="btn" type="button" onClick={() => setVisibleView({ visible: true, id: user._id })}
                            style={{ border: '1px solid black', background: '#1890ff', color: 'white', marginLeft :'25px' }}>
                            Chi tiết
                        </button>
                        <button className="btn" type="button" onClick={() => setVisibleEdit({ visible: true, id: user._id })}
                            style={{ border: '1px solid black', background: 'green', color: 'white', marginLeft :'25px' }}>
                            Sửa
                        </button>
                        <button className="btn" type="button" onClick={() => setVisibleDelete({ visible: true, id: user._id })}
                            style={{ border: '1px solid black', background: 'red', color: 'white', marginLeft :'25px' }}>
                            Xóa
                        </button>
                    </CTableDataCell>
                </CTableRow>
            )
        })
    }
    const onCloseCreate = async () => {
        fetchUsers()
        setVisibleCreate(!visibleCreate)
    }
    const onCloseView = () => {
        setVisibleView({ visible: false, id: null })
    }
    const onCloseEdit = async () => {
        fetchUsers()
        setVisibleEdit({ visible: false, id: null })
    }
    const onCloseDelete = async () => {
        fetchUsers()
        setVisibleDelete({ visible: false, id: null })
    }

    const handleNextPaginationUser = () => {

        let newPageNumber = currentPageNumber + 1;
        setCurrentPageNumber(newPageNumber);
        let skip = (newPageNumber-1)*20;
        currentPayload.skip = skip;
        setCurrentPayload(currentPayload);
        fetchUsers()
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
        fetchUsers()
    }

    return (
        <>
            <CCard className="card mb-4 ccard-content">
                <CCardHeader className="bg-primary" style={{color: "white", fontWeight: '600'}}>DANH SÁCH NGƯỜI DÙNG</CCardHeader>
                <CCardBody>
                    {/* <CRow>
                        <CCol sm={4} lg={3} className='mb-3'>
                            <CFormInput type="text" onChange={handleFilterByKeyword} placeholder="Nhập thông tin cần tìm" />
                        </CCol>
                        <CCol sm={5} lg={3} style={{ textAlign: 'left' }} className='mb-3'>
                            <CButton color="primary"
                                onClick={handleSearch}
                                className="btn-add bg-sky-500 hover:bg-sky-700"> Tìm kiếm</CButton>
                        </CCol>
                    </CRow> */}
                    <CRow>
                        <CCol xs={12} className="col-row-add mb-3" style={{ textAlign: 'right' }}>
                            <CButton color="primary" size="sm" className="btn-add"  style={{background: "#8A2BE2"}} onClick={() => setVisibleCreate(!visibleCreate)}>
                                Thêm mới</CButton>
                        </CCol>
                    </CRow>
                    <CRow>
                        <div className="table-responsive">
                            <CCol xs={12}>
                                <table className="table table-hover table-striped">
                                    <CTableHead>
                                        <CTableRow style={{textAlign :"center"}}>
                                            <CTableHeaderCell style={{ width: '2%' }}>STT</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '13%' }}>Tên người dùng</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '13%' }}>E-mail</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '12%' }}>Số điện thoại</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '20%' }}>Địa Chỉ</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '27%' }}>Chức năng</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {renderBodyTable()} 
                                    </CTableBody>
                                </table>
                                <CPagination aria-label="Page navigation example">
                                    <CPaginationItem onClick={handlePrevPaginationUser} disabled = {currentPageNumber === 1}>Trước</CPaginationItem>
                                    <CPaginationItem onClick={handleNextPaginationUser}>Sau</CPaginationItem>
                                </CPagination>
                            </CCol>
                        </div>
                    </CRow>
                </CCardBody>
            </CCard>
            {visibleCreate && <CreateUserComponent
                visibleCreate={visibleCreate}
                onCloseCreate={onCloseCreate} />}
            {visibleView.visible && <ViewUserComponent visible={visibleView.visible}
                onClose={onCloseView} id={visibleView.id} />}
            {visibleEdit.visible && <EditUserComponent visibleEdit={visibleEdit.visible}
                id={visibleEdit.id} onCloseEdit={onCloseEdit} />}
            {visibleDelete.visible && <DeleteUserComponent visibleDelete={visibleDelete.visible}
                id={visibleDelete.id} onCloseDelete={onCloseDelete} />}   
        </>
    )
}

export default UserComponent