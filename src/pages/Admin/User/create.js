import React, { useState } from 'react'
import FormComponent from './form'
const CreateUserComponent = (props) => {
    let { visibleCreate, onCloseCreate } = props
    return (
        <>
            <FormComponent visible={visibleCreate} header='THÊM MỚI NGƯỜI DÙNG' backgroundColor="#8A2BE2"
                onClose={onCloseCreate} />
        </>
    )
}
export default CreateUserComponent