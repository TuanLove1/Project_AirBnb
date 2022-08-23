import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const fectDataHistoryBookRoom = (id) => {
    return (dispatch) => {
        dispatch(fectDataHistoryBookRoomRequest())
        api.get(`/tickets/by-user?userId=${id}`)
        .then((result)=>{
            dispatch(fectDataHistoryBookRoomSuccess(result.data))
        })
        .catch((error)=>{
            dispatch(fectDataHistoryBookRoomFailed(error))
        })
    }
}

const fectDataHistoryBookRoomRequest = () => {
    return {
        type: ActionType.HISTORYBOOOK_REQUEST
    }
}
const fectDataHistoryBookRoomSuccess = (data) => {
    return {
        type: ActionType.HISTORYBOOOK_SUCCESS,
        payload:data
    }
}
const fectDataHistoryBookRoomFailed = (error) => {
    return {
        type: ActionType.HISTORYBOOOK_FAILED,
        payload:error
    }
}