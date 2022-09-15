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
import CreateUserComponent from './create'
import ViewUserComponent from './view'
import EditUserComponent from './edit'
const initPayload = {
    limit: 20,
    skip: 0,
    orderBy: 1,
    orderName: '',
    groupName: ''
}
const UserComponent = () => {
    const handleFilterByKeyword = (event) => { }
    const handleSearch = (event) => { }
    const [users, setUsers] = useState(null)
    const [currentPayload, setCurrentPayload] = useState(initPayload)
    const [visibleCreate, setVisibleCreate] = useState(false)
    const [visibleView, setVisibleView] = useState({ visible: false, id: null })
    const [visibleEdit, setVisibleEdit] = useState({ visible: false, id: null })

    useEffect(() => {
        sendHttpRequestMessage(currentPayload, methodType.GET, `/users/pagination`)
            .then(response => { setUsers(response) })
            .catch(error => { console.log("Lỗi hệ thộng") })
    }, [])

    const fetchUsers = async () => {
        debugger
        return await sendHttpRequestMessage(currentPayload, methodType.GET, `/users/pagination`)
            .then(response => { setUsers(response) })
            .catch(error => Promise.reject(error))
    }
    const renderBodyTable = () => {
        return users && users.map((user, index) => {
            return (
                <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.phone}</CTableDataCell>
                    <CTableDataCell>
                        <button type="button" onClick={() => setVisibleView({ visible: true, id: user._id })}
                            style={{ border: 'none', background: 'none', color: '#1890ff' }}>
                            <i className='fa fa-eye' />
                        </button>
                        <button type="button" onClick={() => setVisibleEdit({ visible: true, id: user._id })}
                            style={{ border: 'none', background: 'none', color: '#1890ff' }}>
                            <i className='fa fa-edit' />
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
    return (
        <>
            <CCard className="card mb-4 ccard-content">
                <CCardHeader>DANH SÁCH NGƯỜI DÙNG</CCardHeader>
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
                                <table className="table table-hover table-striped">
                                    <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell>STT</CTableHeaderCell>
                                            <CTableHeaderCell>Tên người dùng</CTableHeaderCell>
                                            <CTableHeaderCell>E-mail</CTableHeaderCell>
                                            <CTableHeaderCell>Số điện thoại</CTableHeaderCell>
                                            <CTableHeaderCell style={{ width: '12%' }}>Chức năng</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>
                                    <CTableBody>
                                        {renderBodyTable()}
                                    </CTableBody>
                                </table>
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
        </>
    )
}

export default UserComponent