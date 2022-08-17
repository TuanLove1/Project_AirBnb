import { combineReducers } from "redux";
import dataCiTyReducer from "../../pages/HomePage/reducer";
import dataRoomReducer from "../../pages/ListRoomPage/reducer"
import detailRoomReducer from "../../pages/DetailRoom/reducer"; 
import loginAirBnbReducer from "../../pages/Login/reducer";
import registerAirBnbReducer from "../../pages/Register/reducer";
import dataCiTyInputReducer from "../../components/SearchInput/reducer";
import commentReducer from "../../components/Comment/reducer/";
const rootReducer = combineReducers({
    dataCiTyReducer,
    dataCiTyInputReducer:dataCiTyInputReducer,
    dataRoomReducer,
    detailRoomReducer,
    loginAirBnbReducer,
    registerAirBnbReducer,
    commentReducer,
});

export default rootReducer;