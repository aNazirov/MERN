import { G_ERROR, G_START, SET_ANALYTICS, SET_OVERVIEW } from "../actions/actionTypes"

const initialState = {
    loading: true,
    average: 0,
    chart: {},
    orders: {},
    gain: {}
}

export default function analyticReducer(state = initialState, {type, orders, gain, average, chart}) {
    switch (type) {
        case G_START: 
            return {
                ...state,
                loading: true
            }
        case SET_OVERVIEW: 
            return {
                ...state,
                orders, gain,
                loading: false
            }
        case SET_ANALYTICS: 
            return {
                ...state,
                chart, average,
                loading: false
            }
        case G_ERROR: 
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}