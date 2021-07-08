import React from 'react'

const Tap = ({innerRef}) => {
    return (
        <div 
            ref={innerRef}
            id="tap_target_"
            className="tap-target"
        >
            <div className="tap-target-content">
                <h5>Зачем нужна эта страница?</h5>
                <p>Страница “Обзор” покажет динамику продаж за предыдущий день. Сравнение со средним значениями поможет вам понять, как идут дела у Вашего бизнеса.</p>
            </div>
        </div>
    )
}
export default Tap