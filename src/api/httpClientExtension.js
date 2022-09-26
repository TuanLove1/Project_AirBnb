import { api } from './utils'
import axios from "axios";
import { methodType, commonConstant } from '../commons/constant'
import { getStorage } from '../commons/storage'
export const sendHttpRequestMessage = async (payload, method, endPoint) => {
    const jwtToken = getStorage(commonConstant.JWT_AUTH_TOKEN)
    if (jwtToken !== null) {
        axios.defaults.headers.common.token = `${jwtToken}`
    }
    switch (method) {
        case methodType.GET:
            if (Object.keys(payload).length !== 0) {
                var query = new URLSearchParams(payload).toString()
                endPoint = `${endPoint}?${query}`
            }
            return await api.get(`${endPoint}`).then(res => Promise.resolve(res.data))
                .catch(error => { })
        case methodType.POST:
            return await api.post(`${endPoint}`, payload).then(res => Promise.resolve({
                data: res?.data
            }))
                .catch(error => { })
        case methodType.PUT:
            return await api.put(`${endPoint}`, payload).then(res => Promise.resolve({
                data: res?.data
            }))
                .catch(error => { })
        case methodType.DELETE:
            return await api.delete(`${endPoint}`).then(res => Promise.resolve({
                data: res?.data
            }))
                .catch(error => { })
    }
}