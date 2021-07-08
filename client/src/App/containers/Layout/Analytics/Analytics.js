import React, { useEffect } from 'react';  
import {connect} from 'react-redux'
import { getAnalytics, set_analytics } from '../../../redux/actions/analytic';

import Loader from '@material-ui/core/CircularProgress';
import Average from './components/Average';
import Chart from './components/Chart';

const Analytics = ({getAnalytics, setAnalytics, loading}) => {
    useEffect(() => {
        getAnalytics()
        return () => {
            setAnalytics()
        }
    }, [getAnalytics, setAnalytics])
    return (
        <>
            <div className="page-title">
                <h4>Аналитика</h4>
            </div>
            <div
                className="row center-align"
                style={loading ? {display: 'block'} : {display: 'none'}}
            >
                <Loader color='secondary'/>
            </div>
            <div
                style={loading ? {display: 'none'} : {display: 'block'}}
            >
                <Average />
                <Chart />
            </div>

            
        </>
    )
}
function mSTP(state) {
    return {
        loading: state.analytic?.loading,
    }
}
function mDTP(dispatch) {
    return {
        getAnalytics: () => dispatch(getAnalytics()),
        setAnalytics: () => dispatch(set_analytics())     
    }
}
export default connect(mSTP, mDTP)(Analytics)