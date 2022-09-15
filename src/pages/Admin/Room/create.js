import React, { useState } from 'react'
import FormComponent from './form'
const CreateRoomComponent = (props) => {
    let { visibleCreate, onCloseCreate } = props
    return (
        <>
            <FormComponent visible={visibleCreate} header='THÊM MỚI PHÒNG'
                onClose={onCloseCreate} />
        </>
    )
}
export default CreateRoomComponent