import React, { useState, useEffect } from 'react'
import {
    CButton, CCol, CModal, CModalBody, CModalFooter, CModalTitle,
    CRow, CForm, CFormLabel, CFormInput, CFormTextarea, CFormCheck
} from '@coreui/react'
import _ from 'lodash'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'
import { toast } from 'react-toastify'
import Select from 'react-select'
const initPayload = {
    payload: {
        name: null,
        guests: null,
        bedRoom: null,
        description: null,
        price: null,
        elevator: false,
        hotTub: false,
        pool: false,
        indoorFireplace: false,
        dryer: false,
        gym: false,
        kitchen: false,
        wifi: false,
        heating: false,
        cableTV: false,
        locationId: null,
    },
    validated: false
}

const FormComponent = (props) => {
    let { visible,  onClose, id } = props
    const [currentPayload, setCurrentPayload] = useState(_.cloneDeep(initPayload))
    useEffect(() => {
        sendHttpRequestMessage({}, methodType.GET, `/locations`)
            .then(response => {
                let options = []
                if (response) {
                    _.forEach(response, (item) => {
                        options.push({
                            value: item._id,
                            label: item.name
                        })
                    })
                }
            })
            .catch(error => { console.log("Lỗi hệ thộng") })
    }, [])
    useEffect(() => {
        sendHttpRequestMessage({}, methodType.GET, `/rooms/${id}`)
            .then(response => {
                setCurrentPayload({
                    ...currentPayload,
                    payload: {
                        ...currentPayload.payload,
                        name: response?.name,
                        guests: response?.guests,
                        bedRoom: response?.bedRoom,
                        bath: response?.bath,
                        description: response?.description,
                        price: response?.price,
                        elevator: response?.elevator,
                        hotTub: response?.hotTub,
                        pool: response?.pool,
                        indoorFireplace: response?.indoorFireplace,
                        dryer: response?.dryer,
                        gym: response?.gym,
                        kitchen: response?.kitchen,
                        wifi: response?.wifi,
                        heating: response?.heating,
                        cableTV: response?.cableTV,
                        locationId: response?.locationId
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
                sendHttpRequestMessage(currentPayload.payload, methodType.POST, '/rooms')
                    .then(response => {
                        if (response?.data) {
                            toast.success('Thêm phòng thành công.', { theme: "colored" })
                            onClose()
                        }
                        else {
                            toast.error('Thêm phòng thất bại.', { theme: "colored" })
                        }
                    }).catch(error => { console.log("Lỗi khi tạo") })
            }
            else {
                console.log(currentPayload.payload)
                sendHttpRequestMessage(currentPayload.payload, methodType.PUT, `/rooms/${id}`)
                    .then(response => {
                        if (response?.data) {
                            toast.success('Cập nhật phòng thành công.', { theme: "colored" })
                            onClose()
                        }
                        else {
                            toast.error('Cập nhật phòng thất bại.', { theme: "colored" })
                        }
                    }).catch(error => { console.log("Lỗi khi tạo") })
            }


        }
        setCurrentPayload({ ...currentPayload, validated: true })
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
                    <div className="modal-header" style={{background :"#1890ff"}}>
                        <CModalTitle style={{color : "white"}}>Chi Tiết Thông Tin Phòng</CModalTitle>
                    </div>
                    <CModalBody>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Tên phòng: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                {payload.name}
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Vị trí: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                {payload.locationId?.name}
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Giá: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                {payload.price}
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Khách: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                {payload.guests}
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Giường ngủ: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                {payload.bedRoom}
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Bồn tắm: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                {payload.bath}
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Thang máy: </CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.elevator} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Bồn nước nóng:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.hotTub} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Hồ bơi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.pool} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Lò sưởi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.indoorFireplace} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Máy sấy khô:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.dryer} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Phòng thể dục:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.gym} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Phòng bếp:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.kitchen} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Wifi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.wifi} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Sưởi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.heating} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Truyền hình cáp:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck checked={payload.cableTV} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '16px' }}>Mô tả:</CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                {payload.description}
                            </CCol>
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="dark" size="sm" className="btn-add" style={{background:"black"}} onClick={() => onClose()}> Thoát</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    )
}

export default FormComponent