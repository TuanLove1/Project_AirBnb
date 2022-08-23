import withReactContent from "sweetalert2-react-content";
import { api } from "../../../api/utils";
import * as ActionType from "./constants";
import Swal from 'sweetalert2'

export const fectDataImgInformation = (img) => {
    return (dispatch) => {

        dispatch(fectDataImgInformationRequest())
        api.post(`users/upload-avatar`, img)
            .then((result) => {
                dispatch(fectDataImgInformationSuccess(result.data))
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>Upload ảnh thành công!</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success'
                })
            })
            .catch((error) => {
                dispatch(fectDataImgInformationFailed(error))
            })
    }
}

const fectDataImgInformationRequest = () => {
    return {
        type: ActionType.INFOMARTION_IMG_REQUEST
    }
}
const fectDataImgInformationSuccess = (data) => {
    return {
        type: ActionType.INFOMARTION_IMG_SUCCESS,
        payload: data,
    }
}
const fectDataImgInformationFailed = (error) => {
    return {
        type: ActionType.INFOMARTION_IMG_FAILED,
        payload: error
    }
}

