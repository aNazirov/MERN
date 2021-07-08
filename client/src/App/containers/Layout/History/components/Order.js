import React from 'react';  
import moment from 'moment'
import { connect } from 'react-redux';
import { computePrice, set_list } from '../../../../redux/actions/order';

const Order = ({order = [], listSet, open, setPrice}) => {
    const setList = (list) => () => {
        listSet(list)
        open()
    }
    return (
        <tr>
            <td>{order.order}</td>
            <td>{moment(order.date).format('DD.MM.YYYY')}</td>
            <td>{moment(order.date).format('HH:mm:ss')}</td>
            <td>{setPrice(order.list)} руб.</td>
            <td>
                <button 
                    className="btn btn-small grey darken-1"
                    onClick={setList(order.list)}
                >
                    <i className="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
    )
}
function mDTP(dispatch) {
    return {
        listSet: (list) => dispatch(set_list(list)),
        setPrice: (list) => dispatch(computePrice(list)),
    }
}
export default connect(null, mDTP)(Order)