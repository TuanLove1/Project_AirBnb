import { api } from "../../../api/utils";
import * as ActionType from "./constants";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export const actRegisterAirBnb = (account, navigate) => {
    return (dispatch) => {
        dispatch(actRegisterAirBnbRequest())
        api.post('auth/register', account)
            .then((result) => {
                console.log(result.data);
                dispatch(actRegisterAirBnbSuccess(result.data))
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>Đăng ký thành công!</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success'
                })
                navigate('/login')
            })
            .catch((error) => {
                console.log(error);
                dispatch(actRegisterAirBnbFailed(error))
            })
    }
}

const actRegisterAirBnbRequest = () => {
    return {
        type: ActionType.REGISTER_AIRBNB_REQUEST
    }
}
const actRegisterAirBnbSuccess = (data) => {
    return {
        type: ActionType.REGISTER_AIRBNB_SUCCESS,
        payload: data
    }
}
const actRegisterAirBnbFailed = (error) => {
    return {
        type: ActionType.REGISTER_AIRBNB_FAILED,
        payload: error
    }
}