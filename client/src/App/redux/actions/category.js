import api from "../../axios/axiosCreate"
import { 
    CU_SUCCESS,
    CGBI_SUCCESS,
    G_ERROR, 
    G_START, 
    CG_SUCCESS,
    RESET_FORM,
    SET_IMAGE,
    SET_IMAGEPREVIEW
} from "./actionTypes"
export function set_image(image = null) {
    return {
        type: SET_IMAGE,
        image
    }
}
export function set_imagePreview(imagePreview = '') {
    return {
        type: SET_IMAGEPREVIEW,
        imagePreview
    }
}
export function cg_start() {
    return {
        type: G_START
    }
}
export function cg_success(categories = []) {
    return {
        type: CG_SUCCESS,
        categories
    }
}
export function cu_success(category = {}) {
    return {
        type: CU_SUCCESS,
        category
    }
}
export function cd_success() {
    return {
        type: RESET_FORM
    }
}
export function cgbi_success(category = []) {
    return {
        type: CGBI_SUCCESS,
        category
    }
}
export function cg_error(error) {
    return {
        type: G_ERROR,
        error
    }
}
export function categoriesGet() {
    return async dispatch => {
        dispatch(cg_start())
        try {
            const res = await api.get('/api/category')
            dispatch(cg_success(res.data))
        } catch (error) {
            dispatch(cg_error(error.response?.data))
            return error.response?.data
        }
    }
}
export function categoryGet(id) {
    return async dispatch => {
        try {
            const res = await api.get(`/api/category/${id}`)
            dispatch(cgbi_success(res.data))
        } catch (error) {
            //error.response
            return error.response?.data
        }
    }
}

export function categoryUpdate({id, name, image}) {
    return async dispatch => {
        const fd = new FormData()
        if (image) fd.append('image', image)
        fd.append('name', name)
        try {
            const res =  id ? await api.patch( `/api/category/${id}`, fd ) : await api.post( '/api/category/', fd ) 
            dispatch(cu_success(res.data))
            return res
        } catch (error) {
            return error.response?.data
        }
    }
}
export function categoryDelete(id) {
    return async dispatch => {
        try {
            await api.delete( `/api/category/${id}` )
            dispatch(cd_success())
        } catch (error) {
            return error.response?.data
        }
    }
}
export function reset_form() {
    return {
        type: RESET_FORM
    }
}