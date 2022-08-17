import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const actFectDataCityInput = (city) => {
    return (dispatch) => {
        dispatch(actFectDataCityInputRequest())
        api.get(`locations?location=${city}`)
        .then((result)=>{
            dispatch(actFectDataCityInputSuccess(result.data))
        })
        .catch((error)=>{
            dispatch(actFectDataCityInputFailed(error))
        })
    }
}

const actFectDataCityInputRequest = () => {
    return {
        type:ActionType.DATA_CITY_INPUT_REQUEST,
    }
}
const actFectDataCityInputSuccess = (data) => {
    return {
        type:ActionType.DATA_CITY_INPUT_SUCCESS,
        payload:data,
    }
}
const actFectDataCityInputFailed = (error) => {
    return {
        type:ActionType.DATA_CITY_INPUT_FAILED,
        payload:error,
    }
}