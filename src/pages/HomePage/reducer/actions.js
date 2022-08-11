import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const actFectDataCity = (city ='') => {
    return (dispatch) => {
        dispatch(actFectDataCityRequest())
        api.get(`locations?location=${city}`)
        .then((result)=>{
            console.log(result.data);
            dispatch(actFectDataCitySuccess(result.data))
        })
        .catch((error)=>{
            console.log(error);
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