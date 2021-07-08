import React from 'react';
import {connect} from 'react-redux'

const Orders = ({orders, loading}) => {
    return (
        <div className="col s12 l6">
            {
                Object.keys(orders).length && !loading 
                    ? <div className="card orange lighten-2 white-text">
                            <div className="card-content">
                                <span className="card-title">Заказы:</span>
                                <h3>{orders.yesterday} зак.</h3>
                                <h3 
                                    className={`${orders.isHigher ? 'green-text' : 'red-text'} m0 mb1`}
                                >
                                    <i className="material-icons">{orders.isHigher ? 'arrow_upward' : 'arrow_downward'}</i>
                                    {orders.percent}%
                                </h3>
                                <p>Число заказов вчера на {orders.percent}% {orders.isHigher ? 'выше' : 'ниже'}  среднего значения: {orders.compare} зак. в день</p>
                            </div>
                        </div>
                    : <div className="col s12 center-align"><span className="center-align">Аналитика пока пуста.</span></div>
            }
            
        </div>
    )
}

function mSTP(state) {
    return {
        orders: state.analytic?.orders,
        loading: state.analytic?.loading
    }
}
export default connect(mSTP)(Orders)