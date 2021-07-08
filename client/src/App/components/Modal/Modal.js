import React, { useState } from 'react'
import M from 'materialize-css'
import { connect } from 'react-redux'
import { computePrice, createOrder, remove } from '../../redux/actions/order'


const Modal = ({cancel, innerRef, list, remove, setPrice, create}) => {
    const [pending, setPending] = useState(false)
    const onDelete = (position) => () => {
        remove(position)
        setPrice()
        if(list.length) cancel()
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        setPending(true)
        const order = { 
            list: list.map(item => {
                delete item._id
                return item
            })
        }
        const res = await create(order)
        if(res?.message) return M.toast({html: res.message})
        M.toast({html: `Заказ №${res?.order} создан`})
        cancel()
        setPending(false)
    }
    return (
        <form 
            ref={innerRef}
            onSubmit={onSubmit}
            id="explore_order"
            className="modal modal-fixed-footer"
        >
            <div className="modal-content">
                <h4 className="mb1">Ваш заказ</h4>
                <table className="highlight">
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item, i) => {
                                const key = `${i}${Math.floor(Math.random() * 1000)}` 
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.cost} руб.</td>
                                        <td>
                                            <i 
                                                className="material-icons pointer"
                                                onClick={onDelete(item)}
                                            >
                                                delete
                                            </i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className="order-summary">
                    <p>Общая стоимость <strong>{setPrice(list)} руб.</strong></p>
                </div>
            </div>
            <div className="modal-footer">
                <button 
                    type='button'
                    onClick={cancel}
                    disabled={pending}
                    className="modal-action waves-effect waves-black btn-flat"
                >
                    Отмена
                </button>
                <button 
                    type='submit'
                    disabled={!list.length || pending}
                    className="modal-action btn waves-effect"
                >
                    Подтвердить
                </button>
            </div>
        </form>
    )
}

function mSTP(state) {
    return {
        list: state?.order?.list
    }
}
function mDTP(dispatch) {
    return {
        remove: position => dispatch(remove(position)),
        setPrice: (list) => dispatch(computePrice(list)),
        create: order => dispatch(createOrder(order))
    }
}
export default connect(mSTP, mDTP)(Modal)