import React, { useState } from 'react'
import FormComponent from './form'
const CreateRoomComponent = (props) => {
    let { visibleCreate, onCloseCreate } = props
    return (
        <>
            <FormComponent visible={visibleCreate} header='THÊM MỚI PHÒNG' backgroundColor="#8A2BE2"
                onClose={onCloseCreate} />
        </>
    )
}
export default CreateRoomComponent