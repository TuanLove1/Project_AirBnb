import React, { useState } from 'react'
import FormComponent from './form'
const CreateLocationComponent = (props) => {
    let { visibleCreate, onCloseCreate } = props
    return (
        <>
            <FormComponent visible={visibleCreate} header='THÊM MỚI VỊ TRÍ' backgroundColor="#8A2BE2"
                onClose={onCloseCreate} />
        </>
    )
}
export default CreateLocationComponent