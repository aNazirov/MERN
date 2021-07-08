import React, { useEffect, useState } from 'react';  
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom'

const Navbar = ({open, location, list}) => {
    const [isPosition, setIsPosition] = useState(false)
    useEffect(function setPosition() {
        setIsPosition(location.pathname !== '/order')
    }, [location.pathname])
    return (
        <div className="page-title">
            <h4>
                <Link to="/order">Заказ</Link>
                {
                    isPosition 
                        ? (
                            <>
                                <i className="material-icons">keyboard_arrow_right</i>
                                Добавить продукцию
                            </>
                        )
                        : null
                }
            </h4>
            <button 
                className="waves-effect btn grey darken-1"
                onClick={open}
                disabled={!list.length}
            >
                Завершить
            </button>
        </div>
    )
}
function mSTP(state) {
    return {
        list: state?.order?.list
    }
}
export default withRouter(connect(mSTP)(Navbar))