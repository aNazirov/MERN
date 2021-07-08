import { 
    SNACK_MSG
} from "../actions/actionTypes"

const initialState = {
    snackIsOpen: false,
    snackMsg: null
}

export default function snackReducer(state = initialState, {type, isOpen, msg}) {
    switch (type) {
        case SNACK_MSG:
            return {
                ...state,
                snackIsOpen: isOpen,
                snackMsg: msg
            }
        default:
            return state
    }
}