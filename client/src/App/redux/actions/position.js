import api from "../../axios/axiosCreate"
import { 
    PU_SUCCESS,
    G_START, 
    PG_SUCCESS,
    G_ERROR,
    SET_POSITION,
    PD_SUCCESS,
    P_RESET
} from "./actionTypes"

export function pg_start() {
    return {
        type: G_START
    }
}
export function pg_success(positions = []) {
    return {
        type: PG_SUCCESS,
        positions
    }
}
export function pu_success(positions = []) {
    return {
        type: PU_SUCCESS,
        positions
    }
}
export function pd_success() {
    return {
        type: PD_SUCCESS
    }
}
export function pg_error() {
    return {
        type: G_ERROR
    }
}
export function p_reset() {
    return {
        type: P_RESET
    }
}
export function set_position(position = {}) {
    return {
        type: SET_POSITION,
        position
    }
}

export function positionsGet(id = '') {
    return async dispatch => {
        dispatch(pg_start())
        try {
            const res = await api.get(`/api/position/${id}`)
            dispatch(pg_success(res.data))
        } catch (error) {
            dispatch(pg_error(error.response?.data))
            return error.response?.data
        }
    }
}
export function positionUpdate({id = '', name = '', cost = 0, category = ''}) {
    return async dispatch => {
        const data = {
            id, name, cost, category
        }
        try {
            const res =  id ? await api.patch( `/api/position/${id}`, data ) : await api.post( '/api/position', data ) 
            dispatch(pu_success([]))
            return res?.data
        } catch (error) {
            return error.response?.data
        }
    }
}
export function positionDelete(id = '') {
    return async dispatch => {
        try {
            const res = await api.delete( `/api/position/${id}` )
            dispatch(pd_success())
            return res
        } catch (error) {
            return error.response?.data
        }
    }
}