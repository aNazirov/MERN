import api from "../../axios/axiosCreate"
import { G_ERROR, G_START, SET_ANALYTICS, SET_OVERVIEW } from "./actionTypes"

export function set_overview(orders = {}, gain = {}) {
    return {
        type: SET_OVERVIEW,
        orders, gain
    }
}
export function set_analytics(average = 0, chart = {}) {
    return {
        type: SET_ANALYTICS,
        average, chart
    }
}
export function g_start() {
    return {
        type: G_START,
    }
}
export function g_error() {
    return {
        type: G_ERROR,
    }
}


export function getOverview() {
    return async dispatch => {
        dispatch(g_start())
        try {
            const res = await api.get('/api/analytics/overview')
            dispatch(set_overview(res.data?.orders, res.data?.gain))
        } catch (error) {
            dispatch(g_error())
            return error.response?.data
        }
    }
}

export function getAnalytics() {
    return async dispatch => {
        dispatch(g_start())
        try {
            const res = await api.get('/api/analytics/analytics')
            dispatch(set_analytics(res.data?.average, res.data?.chart))
        } catch (error) {
            dispatch(g_error())
            return error.response?.data
        }
    }
}