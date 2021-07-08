import React, { useEffect } from 'react'
import * as Yup from 'yup' 
import M from 'materialize-css'
import { useFormik } from 'formik'
import { connect } from 'react-redux'

import { positionUpdate } from '../../../../../../redux/actions/position'

const validationSchema = Yup.object().shape({
  name: Yup.string()
      .required('Имя не должено быть пустым.'),
  cost: Yup.number()
      .required('Цена не должена быть пустой.')
      .min(1, 'Цена не может быть меньше 1')
})


const Modal = ({cancel, position = {}, categoryId, innerRef, updatePosition}) => {
  const onCancel = () => {
    formik.resetForm()
    cancel()
  }
  const {name, cost} = position
  const options = {
    enableReinitialize: true,
    initialValues: {
      name: name ? name : '',
      cost: cost ? cost : 1
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = position ? await updatePosition({category: categoryId, id: position._id, ...values}) : await updatePosition({category: categoryId, ...values})
      if(res?.message) return M.toast({html: res.message})
      onCancel()
      M.toast({html: 'Позиция сохранена.'})
    }
  }
  const formik = useFormik(options)
  useEffect(function updateTextFields() {
      M.updateTextFields()
  }, [position, formik.values])
  return (
    <form 
      ref={innerRef}
      id='modal__'
      className="modal"
      onSubmit={formik.handleSubmit}
    >
      <div className="modal-content">
          <h4 className="mb1">Добавить позицию</h4>
            <div className="input-field">
              <input 
                id="name" 
                name='name'
                type="text" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              <label htmlFor="name"> Название </label>
              { formik.errors.name && formik.touched.name && <span className="helper-text red-text">{formik.errors.name}</span>}
          </div>
          <div className="input-field">
              <input 
                id="cost"
                name="cost"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cost}
              />
              <label htmlFor="cost" > Цена </label>
              { formik.errors.cost && formik.touched.cost && <span className="helper-text red-text">{formik.errors.cost}</span>}
          </div>
      </div>
      <div className="modal-footer">
        <button 
          onClick={onCancel}
          type="button"
          className="modal-action waves-effect waves-black btn-flat"
        >
          Отмена
        </button>
        <button 
          type="submit"
          className="modal-action btn waves-effect"
          disabled={ formik.isSubmitting || !(formik.isValid && formik.dirty)}
        >
          Сохранить
        </button>
      </div>
    </form>
  )
}

function mSTP(state) {
  return {
    categoryId: state.category?.category?._id,
    position: state.position?.position
  }
}
function mDTP(dispatch) {
  return {
    updatePosition: position => dispatch(positionUpdate(position))
  }
}
export default connect(mSTP, mDTP)(Modal)