import { 
    AUTH_SUCCESS, 
    AUTO_LOGOUT 
} from "../actions/actionTypes"

const initialState = {
    token: null
}

export default function authReducer(state = initialState, {type, token}) {
    switch (type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token
            }
        case AUTO_LOGOUT:
            return {
                ...state,
                token: null
            }
        default:
            return state
    }
}