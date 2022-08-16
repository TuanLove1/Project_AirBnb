import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const actFectDataCity = () => {
    return (dispatch) => {
        dispatch(actFectDataCityRequest())
        api.get('locations')
        .then((result)=>{
            dispatch(actFectDataCitySuccess(result.data))
        })
        .catch((error)=>{
            dispatch(actFectDataCityFailed(error))
        })
    }
}

const actFectDataCityRequest = () => {
    return {
        type:ActionType.DATA_CITY_REQUEST,
    }
}
const actFectDataCitySuccess = (data) => {
    return {
        type:ActionType.DATA_CITY_SUCCESS,
        payload:data,
    }
}
const actFectDataCityFailed = (error) => {
    return {
        type:ActionType.DATA_CITY_FAILED,
        payload:error,
    }
}