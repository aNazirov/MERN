import {
    G_ERROR,
    G_START,
    CLEAR_ORDER,
    SET_LIST,
    SET_ORDER,
} from "../actions/actionTypes"

const initialState = {
    loading: true,
    orders: [],
    list: []
}
export default function orderReducer(state = initialState, {
    type,
    orders,
    list,
    price
}) {
    switch (type) {
        case G_START:
            return {
                ...state,
                loading: true
            }
        case G_ERROR:
            return {
                ...state,
                loading: false
            }
        case SET_ORDER:
            return {
                ...state,
                orders: [...state.orders, ...orders],
                loading: false
            }
        case SET_LIST:
            return {
                ...state,
                list
            }
        case CLEAR_ORDER:
            return {
                ...state,
                loading: true,
                orders: [],
                list: []
            }
        default:
            return state
    }
}