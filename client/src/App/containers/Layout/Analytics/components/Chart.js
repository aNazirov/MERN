import React from 'react';  

import Order from './Order';
import Gain from './Gain';
import { connect } from 'react-redux';

const Chart = ({loading, chart}) => {
    const labels = !loading && chart.length ? chart.map(item => item.label) : []
    const [attribute, options, canvas] = [{
        height: 50,
        redraw: true
    }, 
    {
        legend:{
            display:true,
            position:'right'
        }
    },
    {
        lineTension: 0.5,
        fill: false,
    }
    ]
    return (
        <>
            <div className="analytics-block pb3">
                <h5>Выручка</h5>
                    <Gain 
                        labels={labels}
                        data={!loading && chart.length ? chart.map(item => item.gain) : []}
                        options={options}
                        canvas={canvas}
                        attribute={attribute}
                    />
            </div>

            <div className="analytics-block">
                <h5>Заказы</h5>
                <Order 
                    labels={labels}
                    data={!loading && chart.length ? chart.map(item => item.order) : []}
                    options={options}
                    canvas={canvas}
                    attribute={attribute}
                />
            </div>
        </>
    )
}
function mSTP(state) {
    return {
        loading: state.analytic?.loading,
        chart: state.analytic?.chart
    }
}
export default connect(mSTP)(Chart)