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
                <div className="modal-header">
                    <CModalTitle >{`CHI TIẾT VỊ TRÍ`}</CModalTitle>
                    <button type="button" className="btn-close" aria-label="Close" onClick={() => onClose()}></button>
                </div>
                <CModalBody>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Tên vị trí:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{location?.name}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Tỉnh/Thành:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{location?.province}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Quốc gia:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{location?.country}</CFormLabel>
                        </CCol>
                    </CRow>
                    <CRow className='mb-3'>
                        <CCol sm={3}>
                            <CFormLabel style={{ fontWeight: 500, fontSize: '14px' }}>Đánh giá:</CFormLabel>
                        </CCol>
                        <CCol sm={9}>
                            <CFormLabel style={{ fontWeight: 400, fontSize: '14px' }}>{location?.valueate}</CFormLabel>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" size="sm" onClick={() => onClose()}> Thoát</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default ViewLocationComponent