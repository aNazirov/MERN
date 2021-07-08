import React, { useEffect } from 'react'; 
import { connect } from 'react-redux';

import Loader from '@material-ui/core/CircularProgress';
import {clear } from '../../../../redux/actions/order'
import Order from './Order';

const Orders = ({orders, loading, getOrders, clear, open, limit, offset}) => {

    const loadMore = () => {
        offset.current += limit.current
        getOrders()
    }
    useEffect(() => {
        const res = getOrders()
        if(res?.message) return res?.message
        return () => clear()
    }, [clear, getOrders])
    return (
        <>
            <table className="highlight mb2">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Сумма</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !!orders.length && orders.map( (item, i) => {
                            const key = `${i}${Math.floor(Math.random() * 1000)}` 
                            return (
                                <Order 
                                    order={item} 
                                    key={key} 
                                    open={open}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="center mb2">
            {
                loading
                    ? <div className="row"><div className="col s12 center-align"><Loader color="secondary"/></div></div>
                        : orders.length && !loading 
                            ? (
                                <button 
                                onClick={loadMore}
                                disabled={orders.length < offset.current + limit.current}
                                className="btn waves-effect grey darken-1 btn-small"
                                >
                                    Загрузить еще
                                </button>
                            )
                        : <div className="row"><div className="col s12 center-align"><span className="center-align">Заказова пока нет.</span></div></div> 
            }
            </div>
        </>
    )
}
function mSTP(state) {
    return {
        orders: state.order?.orders,
        loading: state.order?.loading
    }
}
function mDTP(dispatch) {
    return {
        clear: () => dispatch(clear())
    }
}
export default connect(mSTP, mDTP)(Orders)

// !!orders.length && loading && 
// 