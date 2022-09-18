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
    let { visible, header, backgroundColor,onClose, id } = props
    const [currentPayload, setCurrentPayload] = useState(_.cloneDeep(initPayload))
    const [locationOptions, setLocationOptions] = useState(null)
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
                setLocationOptions(options)
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
    const handleChangeName = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                name: event.target.value
            }
        })
    }
    const handleChangeGuests = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                guests: event.target.value
            }
        })
    }
    const handleChangeBedRoom = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                bedRoom: event.target.value
            }
        })
    }
    const handleChangeBath = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                bath: event.target.value
            }
        })
    }
    const handleChangeElevator = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                elevator: event.target.checked
            }
        })
    }
    const handleChangeHotTub = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                hotTub: event.target.checked
            }
        })
    }
    const handleChangePool = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                pool: event.target.checked
            }
        })
    }
    const handleChangeIndoorFireplace = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                indoorFireplace: event.target.checked
            }
        })
    }
    const handleChangeDryer = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                dryer: event.target.checked
            }
        })
    }
    const handleChangeGym = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                gym: event.target.checked
            }
        })
    }
    const handleChangeKitchen = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                kitchen: event.target.checked
            }
        })
    }
    const handleChangeWifi = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                wifi: event.target.checked
            }
        })
    }
    const handleChangeHeating = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                heating: event.target.checked
            }
        })
    }
    const handleChangeCableTV = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                cableTV: event.target.checked
            }
        })
    }
    const handleChangeDescription = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                description: event.target.value
            }
        })
    }
    const handleChangeLocation = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                locationId: event.value
            }
        })
    }
    const handleChangePrice = (event) => {
        setCurrentPayload({
            ...currentPayload,
            payload: {
                ...currentPayload.payload,
                price: event.target.value
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
                    <div className="modal-header" style={{background : backgroundColor}}>
                        <CModalTitle style={{color : "white"}}>{header}</CModalTitle>
                    </div>
                    <CModalBody>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Tên phòng: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="text" onChange={handleChangeName}
                                    defaultValue={payload.name}
                                    placeholder="Nhập tên phòng" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Vị trí: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <Select options={locationOptions}
                                    defaultValue={locationOptions && _.find(locationOptions, (item) => { return item.value === payload.locationId })}
                                    onChange={handleChangeLocation} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Giá: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput type='number' required
                                    feedbackInvalid='Thông tin bắt buộc'
                                    placeholder='Nhập giá phòng'
                                    defaultValue={payload.price}
                                    onChange={handleChangePrice} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Khách: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="number" onChange={handleChangeGuests}
                                    defaultValue={payload.guests}
                                    placeholder="Nhập số lượng khách" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Giường ngủ: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="number" onChange={handleChangeBedRoom}
                                    defaultValue={payload.bedRoom}
                                    placeholder="Nhập số giường" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Bồn tắm: <sup className='sup-required'>*</sup></CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormInput required type="number" onChange={handleChangeBath}
                                    defaultValue={payload.bath}
                                    placeholder="Nhập bồn tắm" feedbackInvalid="Thông tin bắt buộc." />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Thang máy: </CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeElevator}
                                    checked={payload.elevator} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Bồn nước nóng:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeHotTub}
                                    checked={payload.hotTub} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Hồ bơi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangePool}
                                    checked={payload.pool} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Lò sưởi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeIndoorFireplace}
                                    checked={payload.indoorFireplace} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Máy sấy khô:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeDryer}
                                    checked={payload.dryer} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Phòng thể dục:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeGym}
                                    checked={payload.gym} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Phòng bếp:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeKitchen}
                                    checked={payload.kitchen} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Wifi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeWifi}
                                    checked={payload.wifi} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Sưởi:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeHeating}
                                    checked={payload.heating} />
                            </CCol>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Truyền hình cáp:</CFormLabel>
                            </CCol>
                            <CCol sm={3}>
                                <CFormCheck onChange={handleChangeCableTV}
                                    checked={payload.cableTV} />
                            </CCol>
                        </CRow>
                        <CRow className='mb-2'>
                            <CCol sm={3}>
                                <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Mô tả:</CFormLabel>
                            </CCol>
                            <CCol sm={9}>
                                <CFormTextarea placeholder='Nhập mô tả'
                                    defaultValue={payload.description}
                                    onChange={handleChangeDescription}></CFormTextarea>
                            </CCol>
                        </CRow>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" size="sm" style={{background:backgroundColor}} className="btn-add"> Xác nhận</CButton>
                        <CButton color="dark"  size="sm" className="btn-add" style={{background:"black"}} onClick={() => onClose()}> Thoát</CButton>
                    </CModalFooter>
                </CForm>
            </CModal>
        </>
    )
}

export default FormComponent