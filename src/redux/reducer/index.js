import { combineReducers } from "redux";
import dataCiTyReducer from "../../pages/HomePage/reducer";
import dataRoomReducer from "../../pages/ListRoomPage/reducer"
const rootReducer = combineReducers({
    dataCiTyReducer,
    dataRoomReducer,
});

export default rootReducer;