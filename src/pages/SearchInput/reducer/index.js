import * as ActionType from "./constants"

const initialState = {
    loading: false,
    data: null,
    error: null,
}

const dataCiTyInputReducer = (state = initialState,action) => {
    // console.log('datacityinput state',state);
    // console.log('datacityinput action',action);
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
            console.log(state);

            return {...state}
    }
} 

export default dataCiTyInputReducer