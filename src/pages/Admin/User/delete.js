import React  from 'react'
import {
    CButton, CModal, CModalBody, CModalFooter, CModalTitle,
} from '@coreui/react'
import { sendHttpRequestMessage } from '../../../api/httpClientExtension'
import { methodType } from '../../../commons/constant'
import { toast } from 'react-toastify'

const DeleteUserComponent = (props) => {
    let { visibleDelete, onCloseDelete, id } = props

    let header = "Xóa Vị Trí"
    let visible = visibleDelete
    let onClose = onCloseDelete

    const onDelete = () => {
        if (id) {
            sendHttpRequestMessage(null, methodType.DELETE, `/users/${id}`)
                .then(response => {
                    if (response?.data) {
                        toast.success('Xóa vị trí thành công.', { theme: "colored" })
                        onClose()
                    }
                    else {
                        toast.error('Xóa vị trí thất bại.', { theme: "colored" })
                    }
                }).catch(error => { console.log("Lỗi khi Xóa") })
        }
        console.log(id);
    }

    return (
        <>
            <CModal alignment="center" size="lg" visible={visible}
                backdrop={false}
                keyboard={false}
                portal={false}>
                    <div className="modal-header" style={{background:"red"}}>
                        <CModalTitle style={{color:"white"}} >{header}</CModalTitle>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => onClose()}></button>
                    </div>
                    <CModalBody>
                        <h1 style={ {fontSize : "35px"}}>Bạn có chắc chắn xóa nội dung này không ?</h1>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="danger" size="sm" className="btn-add" style={{background:"red"}} onClick={() => onDelete()}>Xóa</CButton>
                        <CButton color="dark" size="sm" className="btn-add" style={{background:"black"}} onClick={() => onClose()}> Thoát</CButton>
                    </CModalFooter>
            </CModal>
        </>
    )
}
export default DeleteUserComponent