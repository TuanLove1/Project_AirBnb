import React, { useState, useEffect } from 'react'
import {
    CButton, CCol, CModal, CModalBody, CModalFooter, CModalTitle,
    CRow, CFormLabel
} from '@coreui/react'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'

const ViewUserComponent = (props) => {
    let { visible, onClose, id } = props
    const [users, setUsers] = useState(null)
    useEffect(() => {
        sendHttpRequestMessage({}, methodType.GET, `/users/${id}`)
            .then(response => { setUsers(response) })
    }, [id])
    console.log(users)
    return (
        <>
            <CModal alignment="center" size="lg" visible={visible}
                backdrop={false}
                keyboard={false}
                portal={false}>
                <div className="modal-header" style={{background :"#1890ff"}}>
                    <CModalTitle style={{color :"white"}}>{`CHI TIẾT NGƯỜI DÙNG`}</CModalTitle>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => onClose()}></button>
                </div>
                <CModalBody>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Tên người dùng:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{users?.name}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>E-mail:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{users?.email}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Số điện thoại:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{users?.phone}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Địa chỉ:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{users?.address}</CFormLabel>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="dark" size="sm" style={{background :"black"}} onClick={() => onClose()}> Thoát</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ViewUserComponent