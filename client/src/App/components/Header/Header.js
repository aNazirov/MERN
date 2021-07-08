import React from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper grey darken-1">
                <NavLink to="/" className="brand-logo">Newborn</NavLink>
                <ul id="nav-mobile" className="right">
                    <li><NavLink to="/auth/login" activeClassName={classes.active}>Вход</NavLink></li>
                    <li><NavLink to="/auth/register" activeClassName={classes.active}>Регистрация</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header