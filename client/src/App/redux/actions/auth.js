import api from "../../axios/axiosCreate"
import { 
    AUTH_SUCCESS,
    AUTO_LOGOUT
} from "./actionTypes"

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
export function auth(userData, isLogin){
    return async dispatch => {
        const url = isLogin ? '/api/auth/login' : '/api/auth/register'
        try {
            const res = await api.post(url, userData)

            if(isLogin){
                const [expires, data] = [3600, res.data]
                const expiresIn = new Date(new Date().getTime() + expires * 1000)

                localStorage.setItem('auth-token', data.token)
                localStorage.setItem('expiresIn', expiresIn)
                dispatch(authSuccess(data.token))
                dispatch(autoLogout(expires))
                }
        } catch (error) {
            //error.response
            return error.response?.data
        }
    }
}
export function logout() {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('expiresIn')
        return {
            type: AUTO_LOGOUT
        }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000);
    }
}
export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('auth-token')
        const expiresIn = new Date(localStorage.getItem('expiresIn'))
        if (!token || expiresIn <= new Date()) return dispatch(logout())
        dispatch(autoLogout((expiresIn.getTime() - new Date().getTime()) / 1000))
        dispatch(authSuccess(token))
    }
}