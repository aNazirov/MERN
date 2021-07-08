import {combineReducers} from 'redux'
import authReducer from './auth'
import categoryReducer from './category'
import positionReducer from './position'
import orderReducer from './order'
import analyticReducer from './analytic'

export default combineReducers(
    {
        auth: authReducer,
        category: categoryReducer,
        position: positionReducer,
        order: orderReducer,
        analytic: analyticReducer
    }
)