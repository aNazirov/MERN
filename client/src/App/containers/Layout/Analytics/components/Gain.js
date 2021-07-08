import React from 'react';  
import { Line } from 'react-chartjs-2';


const Order = ({labels, data, options, canvas, attribute}) => {
    const dataGain = {
        labels,
        datasets: [
        {
            label: 'Выручка',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.6)',
            data, ...canvas
        },
        ],
    };
    return (
        <Line 
            data={dataGain}
            height={attribute.height}
            options={options}
        />
    )
}

export default Order