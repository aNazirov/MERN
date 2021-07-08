import { 
    CGBI_SUCCESS,
    G_ERROR, 
    G_START, 
    CG_SUCCESS,
    CU_SUCCESS,
    RESET_FORM,
    SET_IMAGE,
    SET_IMAGEPREVIEW
} from "../actions/actionTypes"

const initialState = {
    loading: true,
    categories: [],
    category: {},
    error: '',
    image: '',
    imagePreview: ''
}

export default function categoryReducer(state = initialState, {type, categories, error, category, image, imagePreview}) {
    switch (type) {
        case G_START:
            return {
                ...state,
                loading: true
            }
        case CG_SUCCESS:
            return {
                ...state,
                categories,
                loading: false
            }
        case CGBI_SUCCESS:
            return {
                ...state,
                category
            }
        case CU_SUCCESS:
            return {
                ...state,
                category
            }
        case G_ERROR:
        return {
            ...state,
            loading: true,
            error
        }
        case SET_IMAGE:
        return {
            ...state,
            image
        }
        case SET_IMAGEPREVIEW:
        return {
            ...state,
            imagePreview
        }
        case RESET_FORM:
        return {
            ...state,
            loading: true,
            categories: [],
            category: {},
            error: '',
            image: '',
            imagePreview: ''
        }
        default:
            return state
    }
}