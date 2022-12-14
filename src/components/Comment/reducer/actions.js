import { api } from "../../../api/utils";
import * as ActionType from "./constants";

export const actComment = (id,comment) => {
    return (dispatch) => {
        dispatch(actCommentRequest())
        api.post(`reviews?roomId=${id}`,comment)
        .then((result)=>{
            dispatch(actCommentSuccess(result.data))
        })
        .catch((error)=>{
            dispatch(actCommentFailed(error))
        })
    }
}

const actCommentRequest = () => {
    return {
        type: ActionType.COMMENT_REQUEST
    }
}
const actCommentSuccess = (data) => {
    return {
        type: ActionType.COMMENT_SUCCESS,
        payload:data
    }
}
const actCommentFailed = (error) => {
    return {
        type: ActionType.COMMENT_FAILED,
        payload:error
    }
}