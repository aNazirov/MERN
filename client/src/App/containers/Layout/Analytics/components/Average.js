import React from 'react';  
import { connect } from 'react-redux';

const Average = ({average}) => {
    return (
        <div className="average-price">
            <p>Средний чек <strong>{average} р.</strong></p>
        </div>
    )
}
function mSTP(state) {
    return {
        average: state.analytic?.average
    }
}
export default connect(mSTP)(Average)