import * as ActionType from "./constants";

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const dataRoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.INFO_ROOM_REQUEST: {
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state }
        }
        case ActionType.INFO_ROOM_SUCCESS: {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state }
        }
        case ActionType.INFO_ROOM_FAILED: {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state }
        }
        default:
            return { ...state }
    }
}
export default dataRoomReducer;