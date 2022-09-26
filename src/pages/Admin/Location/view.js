import React, { useState, useEffect } from 'react'
import {
    CButton, CCol, CModal, CModalBody, CModalFooter, CModalTitle,
    CRow, CFormLabel
} from '@coreui/react'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'

const ViewLocationComponent = (props) => {
    let { visible, onClose, id } = props
    const [location, setLocation] = useState(null)
    useEffect(() => {
        sendHttpRequestMessage({}, methodType.GET, `/locations/${id}`)
            .then(response => { setLocation(response) })
    }, [id])
    return (
        <>
            <CModal alignment="center" size="lg" visible={visible}
                backdrop={false}
                keyboard={false}
                portal={false}>
                <div className="modal-header" style={{background :"#1890ff"}}>
                    <CModalTitle style={{ fontWeight: 800, color:"white"}}>{`CHI TIẾT VỊ TRÍ`}</CModalTitle>
                </div>
                <CModalBody>
                    <CRow className='mb-4'> 
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 600, fontSize: '20px' }}>Tên vị trí:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '20px' }}>{location?.name}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-4'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 600, fontSize: '20px' }}>Tỉnh/Thành:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '20px' }}>{location?.province}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-4'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 600, fontSize: '20px' }}>Quốc gia:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '20px' }}>{location?.country}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow >
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 600, fontSize: '20px' }}>Đánh giá:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '20px' }}>{location?.valueate}</CFormLabel>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton size="sm" color='dark' style={{background:"black"}} onClick={() => onClose()}>Thoát</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ViewLocationComponent