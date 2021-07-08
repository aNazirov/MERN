import { 
    PU_SUCCESS,
    G_START, 
    PG_SUCCESS,
    G_ERROR,
    SET_POSITION,
    PD_SUCCESS,
    P_RESET
} from "../actions/actionTypes"

const initialState = {
    loading: true,
    update: false,
    positions: [],
    position: {}
}

export default function positionReducer(state = initialState, {type, positions, position, loading}) {
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
        case PG_SUCCESS: 
            return {
                ...state,
                positions,
                update: false,
                loading: false
            }
        case PU_SUCCESS: 
            return {
                ...state,
                positions,
                update: true
            }
        case PD_SUCCESS: 
            return {
                ...state,
                update: true
            }
        case SET_POSITION:
            return {
                ...state,
                position
            }
        case P_RESET:
            return {
                ...state,
                position: {},
                positions: [],
                update: false,
                loading: true
            }
        default:
            return state
    }
}