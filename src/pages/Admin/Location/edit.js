import React from 'react'
import FormComponent from './form'
const EditLocationComponent = (props) => {
    let { visibleEdit, onCloseEdit, id } = props
    return (
        <>
            <FormComponent visible={visibleEdit} header='CẬP NHẬT VỊ TRÍ' backgroundColor="green"
                onClose={onCloseEdit} id={id} />
        </>
    )
}
export default EditLocationComponent