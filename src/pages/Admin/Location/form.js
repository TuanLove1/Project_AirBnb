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
        province: null,
        country: null,
        valueate: null
    },
    validated: false
}

const FormComponent = (props) => {
    let { visible, header, onClose, id } = props
    console.log(visible)
    const [currentPayload, setCurrentPayload] = useState(_.cloneDeep(initPayload))
    useEffect(() => {
        sendHttpRequestMessage({}, methodType.GET, `/locations/${id}`)
            .then(response => {
                setCurrentPayload({
                    ...currentPayload,
                    payload: {
                        ...currentPayload.payload,
                        name: response?.name,
                        province: response?.province,
                        country: response?.country,
                        valueate: response?.valueate
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
                sendHttpRequestMessage(currentPayload.payload, methodType.POST, '/locations')
                    .then(response => {
                        if (response?.data) {
                            toast.success('Thêm vị trí thành công.', { theme: "colored" })
                            onClose()
                        }
                        else {
                            toast.error('Thêm vị trí thất bại.', { theme: "colored" })
                        }
                    }).catch(error => { console.log("Lỗi khi tạo") })
            }
            else {
                sendHttpRequestMessage(currentPayload.payload, methodType.PUT, `/locations/${id}`)
                    .then(response => {
                        if (response?.data) {
                            toast.success('Cập nhật vị trí thành công.', { theme: "colored" })
                            onClose()
                        }
                        else {
                            toast.error('Cập nhật vị trí thất bại.', { theme: "colored" })
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
    const handleChangeProvince = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                province: event.target.value
            }
        })
    }
    const handleChangeCountry = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                country: event.target.value
            }
        })
    }
    const handleChangeValueate = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                valueate: event.target.value
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
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Tên vị trí: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangeName}
                                    defaultValue={payload.name}
                                    placeholder="Nhập tên vị trí" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Tỉnh/Thành: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangeProvince}
                                    defaultValue={payload.province}
                                    placeholder="Nhập tỉnh thành" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Quốc gia: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangeCountry}
                                    defaultValue={payload.country}
                                    placeholder="Nhập quốc gia" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-3'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Đánh giá: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="number" onChange={handleChangeValueate}
                                    defaultValue={payload.valueate}
                                    placeholder="Nhập đánh giá" feedbackInvalid="Thông tin bắt buộc." />
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