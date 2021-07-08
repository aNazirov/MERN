import React from 'react';  
import { Line } from 'react-chartjs-2';


const Order = ({labels, data, options, canvas, attribute}) => {
    const dataOrder = {
        labels,
        datasets: [
        {
            label: 'Заказы',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.6)',
            data, ...canvas
        },
        ],
    };
    return (
        <Line 
            data={dataOrder}
            height={attribute.height}
            options={options}
        />
    )
}

export default Order