import React, { useEffect } from 'react';
import * as Yup from 'yup' 
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { withRouter } from 'react-router-dom';

import UploadInput from './Image/UploadInput';
import Image from './Image/Image';
import { categoryUpdate } from '../../../../../../redux/actions/category';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Имя не должено быть пустым.')
})


const Create = ({nameC, id, image, categoryUpdate, history}) => {
    const options = {
        enableReinitialize: true,
        initialValues: {
            name: nameC ? nameC : '',
            image: ''
        },
        validationSchema,
        onSubmit: async ({name}) => {
            let res =  id ? await categoryUpdate({id, name, image}) : await categoryUpdate({name, image})
            if (res.message) return M.toast({html: res.message})
            id ? M.toast({html: 'Изменения сохранены.'}) : history.push({ pathname: `/categories/${res.data._id}`, created: true })
        }
    }
    const formik = useFormik(options)
    useEffect(function updateTextFields() {
        M.updateTextFields()
    })

    return (
        <>
            <form className="col s12 l6" onSubmit={formik.handleSubmit}>
                <div className="input-field">
                    <input 
                        id="name"
                        name="name"
                        type="text"
                        className={formik.errors.name &&  formik.touched.name ? 'invalid' : null}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    <label htmlFor="name">Название</label>
                    {formik.errors.name &&  formik.touched.name && <span className="helper-text red-text">{formik.errors.name}</span>}
                </div>

                <div>
                    <UploadInput 
                        formik={formik}
                        handleBlur={formik.handleBlur}
                        handleChange={formik.handleChange}
                    />
                </div>

                <div>
                    <button 
                        type="submit"
                        className="waves-effect waves-light btn"
                        disabled={ formik.isSubmitting || !(formik.isValid && formik.dirty)}
                    >
                        Сохранить изменения
                    </button>
                </div>
            </form>

            <div className="col s12 l4 center">
                <Image />
            </div>
        </>
    )
}
function mSTP(state) {
    return {
        nameC: state.category?.category?.name,
        id: state.category?.category?._id,
        image: state.category?.image,
    }
}
function mDTP(dispatch) {
    return {
        categoryUpdate: category => dispatch(categoryUpdate(category)),
    }
}
export default withRouter(connect(mSTP, mDTP)(Create))
