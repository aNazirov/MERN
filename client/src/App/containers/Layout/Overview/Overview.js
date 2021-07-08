import React, { useEffect } from 'react';
import moment from 'moment'
import {connect} from 'react-redux'
import { getOverview, set_overview } from '../../../redux/actions/analytic';

import Loader from '@material-ui/core/CircularProgress';
import Gain from './components/Gain'
import Orders from './components/Orders'

const Overview = ({getOverview, setOverview, loading}) => {
    useEffect(() => {
        getOverview()
        return () => {
            setOverview()
        }
    }, [getOverview, setOverview])
    return (
        <>
            <div className="page-title">
                <h4>
                    Обзор за вчера ({moment().add(-1, 'days').format('DD.MM.YYYY')})
                    <i 
                        className="material-icons black-text pointer"
                    >
                        info_outline
                    </i>
                </h4>
            </div>

            <div className="row">
            { loading 
                ? <div className="col s12 center-align"><Loader color='secondary'/></div> 
                : <>
                    <Gain />
                    <Orders />
                </>
            }
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
        getOverview: () => dispatch(getOverview()),
        setOverview: () => dispatch(set_overview())     
    }
}
export default connect(mSTP, mDTP)(Overview)
