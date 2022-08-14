import { combineReducers } from "redux";
import dataCiTyReducer from "../../pages/HomePage/reducer";
import dataRoomReducer from "../../pages/ListRoomPage/reducer"
import detailRoomReducer from "../../pages/DetailRoom/reducer"; 
import loginAirBnbReducer from "../../pages/Login/reducer";
import registerAirBnbReducer from "../../pages/Register/reducer";
const rootReducer = combineReducers({
    dataCiTyReducer,
    dataRoomReducer,
    detailRoomReducer,
    loginAirBnbReducer,
    registerAirBnbReducer,
});

export default rootReducer;