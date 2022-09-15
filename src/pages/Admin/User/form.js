import React, { useState, useEffect } from 'react'
import {
    CButton, CCol, CModal, CModalBody, CModalFooter, CModalTitle,
    CRow, CForm, CFormLabel, CFormInput, CFormTextarea
} from '@coreui/react'
import _ from 'lodash'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'
import { toast } from 'react-toastify'
const initPayload = {
    payload: {
        name: null,
        email: null,
        password: null,
        phone: null,
        birthday: null,
        gender: null,
        type: "ADMIN",
        address: null
    },
    validated: false
}

const FormComponent = (props) => {
    let { visible, header, onClose, id } = props
    console.log(visible)
    const [currentPayload, setCurrentPayload] = useState(_.cloneDeep(initPayload))
    useEffect(() => {
        sendHttpRequestMessage({}, methodType.GET, `/users/${id}`)
            .then(response => {
                setCurrentPayload({
                    ...currentPayload,
                    payload: {
                        ...currentPayload.payload,
                        name: response?.name,
                        email: response?.email,
                        password: response?.password,
                        phone: response?.phone,
                        address: response?.address
                    }
                })
            })
    }, [id])
    const onSubmit = (event) => {
        const form = event.currentTarget
        event.preventDefault()
        event.stopPropagation()
        if (form.checkValidity() === true) {
            if (!id) {
                sendHttpRequestMessage(currentPayload.payload, methodType.POST, '/users')
                    .then(response => {
                        if (response?.data) {
                            toast.success('Thêm người dùng thành công.', { theme: "colored" })
                            onClose()
                        }
                        else {
                            toast.error('Thêm người dùng thất bại.', { theme: "colored" })
                        }
                    }).catch(error => { console.log("Lỗi khi tạo") })
            }
            else {
                sendHttpRequestMessage(currentPayload.payload, methodType.PUT, `/users/${id}`)
                    .then(response => {
                        if (response?.data) {
                            toast.success('Cập nhật người dùng thành công.', { theme: "colored" })
                            onClose()
                        }
                        else {
                            toast.error('Cập nhật người dùng thất bại.', { theme: "colored" })
                        }
                    }).catch(error => { console.log("Lỗi khi tạo") })
            }


        }
        setCurrentPayload({ ...currentPayload, validated: true })
    }
    const handleChangeName = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                name: event.target.value
            }
        })
    }
    const handleChangeEmail = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                email: event.target.value
            }
        })
    }
    const handleChangePassword = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                password: event.target.value
            }
        })
    }
    const handleChangePhone = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                phone: event.target.value
            }
        })
    }
    const handleChangeAddress = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                address: event.target.value
            }
        })
    }
    let { validated, payload } = currentPayload
    return (
        <>
            <CModal alignment="center" size="lg" visible={visible}
                backdrop={false}
                keyboard={false}
                portal={false}>
                <CForm className="g-3 needs-validation" noValidate
                    validated={validated}
                    onSubmit={onSubmit}>
                    <div className="modal-header">
                        <CModalTitle >{header}</CModalTitle>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => onClose()}></button>
                    </div>
                    <CModalBody>
                        <CRow className='mb-3'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }} htmlFor="credentialGroupName">Tên người dùng: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangeName}
                                    defaultValue={payload.name}
                                    placeholder="Nhập tên người dùng" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>E-mail: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangeEmail}
                                    defaultValue={payload.email}
                                    placeholder="Nhập E-mail" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        {!id &&
                            <CRow className='mb-3'>
                                <CCol sm={3}>
                                    <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Mật khẩu: <sup className='sup-required'>*</sup></CFormLabel>
                                </CCol>
                                <CCol sm={9}>
                                    <CFormInput required type="password" onChange={handleChangePassword}
                                        placeholder="Nhập mật khẩu" feedbackInvalid="Thông tin bắt buộc." />
                                </CCol>
                            </CRow>
                        }
                        <CRow className='mb-3'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Điện thoại: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangePhone}
                                    defaultValue={payload.phone}
                                    placeholder="Nhập số điện thoại" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Địa chỉ: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangeAddress}
                                    defaultValue={payload.address}
                                    placeholder="Nhập địa chỉ" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="success" size="sm" className="btn-add"> Xác nhận</CButton>
                        <CButton color="success" size="sm" className="btn-add" onClick={() => onClose()}> Thoát</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    )
}

export default FormComponent