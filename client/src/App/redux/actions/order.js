import api from "../../axios/axiosCreate"
import {
    G_ERROR,
    G_START,
    CLEAR_ORDER,
    SET_LIST, 
    SET_ORDER
} from "./actionTypes"

export function get_start() {
    return {
        type: G_START
    }
}
export function get_error() {
    return {
        type: G_ERROR
    }
}
export function set_list(list) {
    return {
        type: SET_LIST,
        list
    }
}
export function add(position) {
    return (dispatch, getState) => {
        const [{order}, orderPosition] = [getState(), Object.assign({}, {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity,
            _id: position._id
        })]
        const candidate = order.list.find(p => p._id === orderPosition._id) 
        let list
        if (candidate) {
            candidate.quantity += orderPosition.quantity
            list = [...order.list]
        } else list = [...order.list, orderPosition]
        dispatch(set_list(list))
    }
}
export function computePrice(list = []) {
    return () => {
        const totalPrice = list.reduce((total, item) => {
            return total += item.cost * item.quantity
        }, 0)
        return totalPrice || 0
    }
}
export function set_order(orders) {
    return {
        type: SET_ORDER,
        orders
    }
}
export function remove(orderPosition) {
    return (dispatch, getState) => {
        const [{order}] = [getState()]
        const list = order.list.filter(p => p._id !== orderPosition._id)
        dispatch(set_list(list))
    }
}
export function clear() {
    return {
        type: CLEAR_ORDER
    }
}
export function createOrder(order) {
    return async dispatch => {
        try {
            const res = await api.post('/api/order', order)
            dispatch(clear())
            return res?.data
        } catch (error) {
            return error.responce?.data
        }
    }
}
export function getAllOrders(params = {}) {
    return async dispatch => {
        dispatch(get_start())
        try {
            const res = await api.get('/api/order', {
                params: params
            })
            dispatch(set_order(res?.data))
        } catch (error) {
            dispatch(get_error())
            return error.responce?.data
        }
    }
}