import React from 'react'
import * as Yup from 'yup' 
import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../../redux/actions/auth';


const initialValues = {
    email: '',
    password: ''
}
const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Невалидный email.')
            .required('Email не должен быть пустым.'),
        password: Yup.string()
            .min(6, 'Пароль меньше 6 символов')
            .required('Пароль не должен быть пустым.')
    })

const Authenticate = props => {
        const formik = useFormik({
            initialValues,
            validationSchema,
            onSubmit: values => props.handleSubmit(values, props)
        })
        return (
            <form 
                onSubmit={formik.handleSubmit}
                className="card" 
            >
                <div className="card-content">
                    <span className="card-title">{props.title}</span>
                    <div className="input-field">
                        <input 
                            id="email" 
                            type="email"
                            name="email" 
                            className={formik.errors.email &&  formik.touched.email && 'invalid'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        <label htmlFor="email">Email:</label>
                        {formik.errors.email &&  formik.touched.email && <span className="helper-text red-text">{formik.errors.email}</span>}
                    </div>
                    <div className="input-field">
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            className={formik.errors.password &&  formik.touched.password && 'invalid'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        <label htmlFor="password">Пароль:</label>
                        {formik.errors.password &&  formik.touched.password && <span className="helper-text red-text">{formik.errors.password}</span>}
                    </div>
                </div>
                <div className="card-action">
                    <button 
                        type="submit"
                        className="modal-action btn waves-effect"
                        disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
                    >
                        {props.button}
                    </button>
                </div>
            </form>
        )
}

function mDTP(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
} 
export default withRouter(connect(null, mDTP)(Authenticate))