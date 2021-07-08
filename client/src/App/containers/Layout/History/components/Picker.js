import React, { useEffect, useState } from 'react';  
import M from 'materialize-css'
import moment from 'moment';


const Picker = ({formik, startRef, endRef}) => {

    const [[picker1, setPicker1], [picker2, setPicker2]] = [useState(), useState()]
    
    useEffect(()=> {
        if(!picker1 && !picker2){
            const [pick1, pick2] = [
                M.Datepicker.init(startRef.current, {
                    format: 'dd-mm-yyyy',
                    showClearBtn: true,
                    onSelect: (date) => formik.setFieldValue('start', moment(date).format("MM-DD-YYYY"), true),
                    onClose: () => picker1?.destroy()
                }),
                M.Datepicker.init(endRef.current, {
                    format: 'dd-mm-yyyy',
                    showClearBtn: true,
                    onSelect: (date) => formik.setFieldValue('end', moment(date).format("MM-DD-YYYY"), true),
                    onClose: () => picker2?.destroy()
                })
            ]
            setPicker1(pick1)
            setPicker2(pick2)
        }
        M.updateTextFields()
    }, [picker1, picker2, setPicker1, setPicker2, formik, endRef, startRef])

    return (
        <div className="col filter-pickers">
            <div className="input-field">
                <input 
                    ref={startRef}
                    type="text" 
                    id='start'
                    name='start'
                    className={formik.errors.start &&  formik.touched.start && 'invalid'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label>Начало</label>
                {formik.errors.start &&  formik.touched.start && <span className="helper-text red-text">{formik.errors.start}</span>}
            </div>

            <div className="input-field">
                <input 
                    ref={endRef}
                    type="text" 
                    id="end"
                    name="end"
                    className={formik.errors.end &&  formik.touched.end && 'invalid'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <label>Конец</label>
                {formik.errors.end &&  formik.touched.end && <span className="helper-text red-text">{formik.errors.end}</span>}
            </div>
        </div>
    )
}
export default Picker
