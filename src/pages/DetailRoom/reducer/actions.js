import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const actFectDetailRoom = (id) => {
    return (dispatch) => {
        dispatch(actFectDetailRoomRequest())
        api.get(`rooms/${id}`)
        .then((result)=>{
            console.log(result.data);
            dispatch(actFectDetailRoomSuccess(result.data))
        })
        .catch((error)=>{
            console.log(error);
            dispatch(actFectDetailRoomFailed(error))
        })
    }
}

const actFectDetailRoomRequest = () => {
    return {
        type:ActionType.DETAIL_ROOM_REQUEST,
    }
}
const actFectDetailRoomSuccess = (data) => {
    return {
        type:ActionType.DETAIL_ROOM_SUCCESS,
        payload:data
    }
}
const actFectDetailRoomFailed = (error) => {
    return {
        type:ActionType.DETAIL_ROOM_FAILED,
        payload: error
    }
}