import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const fectDataInformation = (id) => {
    return (dispatch) => {
        dispatch(fectDataInformationRequest())
        api.get(`users/${id}`)
        .then((result)=>{
            dispatch(fectDataInformationSuccess(result.data))
        })
        .catch((error)=>{
            dispatch(fectDataInformationFailed(error))
        })
    }
}

const fectDataInformationRequest = () => {
    return {
        type:ActionType.INFOMARTION_REQUEST
    }
}
const fectDataInformationSuccess = (data) => {
    return {
        type:ActionType.INFOMARTION_SUCCESS,
        payload:data,
    }
}
const fectDataInformationFailed = (error) => {
    return {
        type:ActionType.INFOMARTION_FAILED,
        payload:error
    }
}

