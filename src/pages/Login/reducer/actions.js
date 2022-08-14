import { api } from "../../../api/utils";
import * as ActionType from "./constants";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export const actLoginAirBnb = (account, navigate) => {
    return (dispatch) => {
        dispatch(actLoginAirBnbRequest())
        api.post('auth/login', account)
            .then((result) => {
                console.log(result.data);
                dispatch(actLoginAirBnbSuccess(result.data))
                localStorage.setItem('token', JSON.stringify(result.data.token))
                localStorage.setItem('user', JSON.stringify(result.data.user))
                const MySwal = withReactContent(Swal)
                MySwal.fire({
                    title: <strong>Đăng nhập thành công!</strong>,
                    html: <i>You clicked the button!</i>,
                    icon: 'success'
                })
                navigate('/')
            })
            .catch((error) => {
                console.log(error);
                dispatch(actLoginAirBnbFailed(error))
            })
    }
}

const actLoginAirBnbRequest = () => {
    return {
        type: ActionType.LOGIN_AIRBNB_REQUEST
    }
}
const actLoginAirBnbSuccess = (data) => {
    return {
        type: ActionType.LOGIN_AIRBNB_SUCCESS,
        payload: data
    }
}
const actLoginAirBnbFailed = (error) => {
    return {
        type: ActionType.LOGIN_AIRBNB_FAILED,
        payload: error
    }
}