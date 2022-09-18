import React, { useState } from 'react'
import FormComponent from './form'
const EditUserComponent = (props) => {
    let { visibleEdit, onCloseEdit, id } = props
    return (
        <>
            <FormComponent visible={visibleEdit} header='CẬP NHẬT NGƯỜI DÙNG' backgroundColor="green"
                onClose={onCloseEdit} id={id} />
        </>
    )
}
export default EditUserComponent