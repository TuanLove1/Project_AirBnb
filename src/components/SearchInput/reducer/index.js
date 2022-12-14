import * as ActionType from "./constants"

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const dataCiTyInputReducer = (state = initialState,action) => {
    switch (action.type) {
        
        case ActionType.DATA_CITY_INPUT_REQUEST:{
            state.loading = true;
            state.data = null;
            state.error = null;
            return {...state}
        }
        case ActionType.DATA_CITY_INPUT_SUCCESS:{
            state.loading = false;
            state.data = action.payload;
            state.error = null;

            return {...state}
        }
        case ActionType.DATA_CITY_INPUT_FAILED:{
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return {...state}
        }
        default:

            return {...state}
    }
} 

export default dataCiTyInputReducer