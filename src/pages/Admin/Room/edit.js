import React, { useState } from 'react'
import FormComponent from './form'
const EditRoomComponent = (props) => {
    let { visibleEdit, onCloseEdit, id } = props
    return (
        <>
            <FormComponent visible={visibleEdit} header='CẬP NHẬT PHÒNG'
                onClose={onCloseEdit} id={id} />
        </>
    )
}
export default EditRoomComponent