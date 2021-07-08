import React, { useEffect, useState } from 'react';
import M from 'materialize-css'
import { connect } from 'react-redux';
import { add, computePrice } from '../../../../../redux/actions/order';


const Position = ({position = {}, add, setPrice}) => {
    const [position$, setPosition] = useState({})
    const quantityChange = (e) => {
        const [quantity, $position] = [e?.target?.value || '1', Object.assign({}, position)]
        $position.quantity = +quantity
        setPosition($position)
    }
    const addToOrder = position => async () => {
        M.toast({html: `Добавлено х${position.quantity}`})
        add(position)
        setPrice()
    }
    useEffect(quantityChange, [position])
    return (
        <>
            <tr>
                <td>{position.name}</td>
                <td>{position.cost} руб.</td>
                <td>
                    <div className="input-field inline order-position-input">
                        <input 
                            type="number" 
                            min="1" 
                            onChange={quantityChange}
                            value={position$.quantity || '1'}
                        />
                    </div>
                </td>
                <td>
                    <button 
                        onClick={addToOrder(position$)}
                        disabled={!+position$.quantity}
                        className="btn waves-effect wavers-light btn-small"
                    >
                        Добавить
                    </button>
                </td>
            </tr>
        </>
    )
}

function mDTP(dispatch) {
    return {
        add: position => dispatch(add(position)),
        setPrice: () => dispatch(computePrice())
    }
}
export default connect(null, mDTP)(Position)
