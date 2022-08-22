import * as ActionType from "./constants";

const initialState = {
    loading:false,
    data: null,
    error: null,
}

export const informationReducer = (state = initialState,action) => {
    switch (action.type) {
        case ActionType.INFOMARTION_REQUEST:{
            state.loading = true;
            state.data = null;
            state.error = null
            return {...state}
        }
        case ActionType.INFOMARTION_SUCCESS:{
            state.loading = false;
            state.data = action.payload;
            state.error = null
            return {...state}
        }
        case ActionType.INFOMARTION_FAILED:{
            state.loading = false;
            state.data = null;
            state.error = action.payload
            return {...state}
        }
        default:
            return {...state}
    }
} 