import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { computePrice } from '../../redux/actions/order'


const ModalHistory = ({ cancel, innerRef, list, setPrice}) => {
    useEffect(() => (
        setPrice()
    ), [list, setPrice])
    const onClose = () => {
        cancel()
    }
    return (
        <div 
            ref={innerRef}
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
                    onClick={onClose}
                    className="modal-action waves-effect waves-black btn-flat"
                >
                    Закрыть
                </button>
            </div>
        </div>
    )
}

function mSTP(state) {
    return {
        list: state?.order?.list
    }
}
function mDTP(dispatch) {
    return {
        setPrice: (list) => dispatch(computePrice(list)),
    }
}
export default connect(mSTP, mDTP)(ModalHistory)