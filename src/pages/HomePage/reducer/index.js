import * as ActionType from "./constants"

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const dataCiTyReducer = (state = initialState,action) => {
    console.log('datacity state',state);
    console.log('datacity action',action);
    switch (action.type) {
        case ActionType.DATA_CITY_REQUEST:{
            state.loading = true;
            state.data = null;
            state.error = null;
            return {...state}
        }
        case ActionType.DATA_CITY_SUCCESS:{
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return {...state}
        }
        case ActionType.DATA_CITY_FAILED:{
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return {...state}
        }
        default:
            return state
    }
} 

export default dataCiTyReducer;