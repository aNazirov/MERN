import React, { useRef } from 'react';  
import * as Yup from 'yup'
import { useFormik } from 'formik';
import moment from 'moment';
import Picker from './Picker';
import { clear } from '../../../../redux/actions/order';
import { connect } from 'react-redux';

const initialValues = {
    start: '',
    end: '',
    order: ''
}
const validationSchema = Yup.object().shape({
    start: Yup.string()
        .test(
            'test1',
            'Начальная дата не может быть больше конечной.',
            function(value){
                let { end } = this.parent;
                if(end && value) return moment(value, "MM-DD-YYYY").isBefore(moment(end, "MM-DD-YYYY"))
                return true
            }
        ),
    end: Yup.string()
        .test(
            'test2',
            'Конечная дата не может быть меньше начальной.',
            function(value){
                let { start } = this.parent;
                if(start && value) return moment(start, "MM-DD-YYYY").isBefore(moment(value, "MM-DD-YYYY"))
                return true
            }
        ),
    order: Yup.number()
        .min(1, 'Номер заказа не может быть меньше 1.')
})


const Filter = ({hide, offset, getOrders, filter, clear, setIsFiltered}) => {
    const startRef = useRef()
    const endRef = useRef()
    const formik = useFormik({
        initialValues, validationSchema, 
        onSubmit: ({order, start, end}) => {
            offset.current = 0
            filter.current = {
                order,
                start: start ? new Date(start) : '',
                end: end ? new Date(end) : ''
            }
            clear()
            getOrders()
        }
    })
    const onReset = () => {
        filter.current = {}
        setIsFiltered(false)
        startRef.current.value = ''
        endRef.current.value = ''
        formik.resetForm()
    }
    return (
        <form 
            className="filter"
            hidden={hide}
            onSubmit={formik.handleSubmit}
        >
            <div className="fr">
                <div className="col order">
                    <div className="input-field inline order-position-input">
                        <input 
                            type="number" 
                            id="order"
                            name='order' 
                            className={formik.errors.order &&  formik.touched.order && 'invalid'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.order}
                            min="0"
                        />
                        <label htmlFor="number">Номер заказа</label>
                        {formik.errors.order &&  formik.touched.order && <span className="helper-text red-text">{formik.errors.order}</span>}
                    </div>
                </div>
                {!hide && <Picker formik={formik} startRef={startRef} endRef={endRef}/>}
            </div>
            <button 
                type='reset'
                disabled={!formik.dirty}
                onClick={onReset}
                className="waves-effect waves-black btn-flat"
            >
                Очистить
            </button>
            <button 
                type='submit'
                disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
                className="btn waves-effect wavers-light btn-small"
            >
                Применить фильтр
            </button>
        </form>
    )

}
function mDTP(dispatch) {
    return {
        clear: () => dispatch(clear())
    }
}
export default connect(null, mDTP)(Filter)
