import React, { useState } from 'react'
import FormComponent from './form'
const CreateUserComponent = (props) => {
    let { visibleCreate, onCloseCreate } = props
    return (
        <>
            <FormComponent visible={visibleCreate} header='THÊM MỚI NGƯỜI DÙNG'
                onClose={onCloseCreate} />
        </>
    )
}
export default CreateUserComponent