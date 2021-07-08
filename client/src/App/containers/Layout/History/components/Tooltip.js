import React, { useState } from 'react'

const Navbar = () => {
    const [hide, setHide] = useState(true)

    const hideSet = (val = true) => () => {
        setHide(val)
    }
    return (
        <>
            <div className="page-title">
                <h4>История заказов</h4>
                <button 
                    className={`btn btn-small ${hide ? '' : 'active'}`} 
                    onClick={hide ? hideSet(false) : hideSet()}
                >
                    <i className="material-icons">filter_list</i>
                </button>
            </div>
            <div 
                className="filter"
                hidden={hide}
            >
            <div className="fr">
                <div className="col order">
                    <div className="input-field inline order-position-input">
                        <input type="number" id="number" min="1" />
                        <label htmlFor="number">Номер заказа</label>
                    </div>
                </div>
                <div className="col filter-pickers">
                    <div className="input-field">
                        <input type="text" className="datepicker" />
                        <label>Начало</label>
                    </div>

                    <div className="input-field">
                        <input type="text" className="datepicker" />
                        <label>Конец</label>
                    </div>
                </div>
            </div>

            <button className="btn waves-effect wavers-light btn-small">Применить фильтр</button>
        </div>
        </>
    )
}
export default Navbar
