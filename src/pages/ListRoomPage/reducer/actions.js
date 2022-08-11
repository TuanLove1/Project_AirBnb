import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const fectDataRoom = (id) => {
    return (dispatch) => {
        dispatch(actFectDataRoomRequest());
        api.get(`rooms?locationId=${id}`)
        .then((result)=>{
            console.log(result.data);
            dispatch(actFectDataRoomSuccess(result.data))
        })
        .catch((error)=>{
            console.log(error);
            dispatch(actFectDataRoomFailed(error))
        })
    }
}

const actFectDataRoomRequest = () => {
    return {
        type:ActionType.INFO_ROOM_REQUEST
    }
}
const actFectDataRoomSuccess = (data) => {
    return {
        type:ActionType.INFO_ROOM_SUCCESS,
        payload:data
    }
}
const actFectDataRoomFailed = (error) => {
    return {
        type:ActionType.INFO_ROOM_FAILED,
        payload:error
    }
}