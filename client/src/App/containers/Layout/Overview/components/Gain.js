import React from 'react';
import {connect} from 'react-redux'

const Gain = ({gain, loading}) => {
    return (
        <div className="col s12 l6">
            {
                Object.keys(gain).length && !loading 
                    ? <div className="card light-blue lighten-2 white-text">
                            <div className="card-content">
                                <span className="card-title">Выручка:</span>
                                <h3>{gain.yesterday} руб.</h3>
                                <h3 
                                    className={`${gain.isHigher ? 'green-text ' : 'red-text'} m0 mb1`}
                                >
                                    <i className="material-icons">{gain.isHigher ? 'arrow_upward' : 'arrow_downward'}</i>
                                    {gain.percent}%
                                </h3>
                                <p>Выручка вашего бизнеса вчера на {gain.percent}% {gain.isHigher ? 'выше' : 'ниже'} среднего: {gain.compare} руб. в день</p>
                            </div>
                        </div>
                    : <div className="col s12 center-align"><span className="center-align">Аналитика пока пуста.</span></div>
            }
        </div>
    )
}

function mSTP(state) {
    return {
        gain: state.analytic?.gain,
        loading: state.analytic?.loading
    }
}
export default connect(mSTP)(Gain)
