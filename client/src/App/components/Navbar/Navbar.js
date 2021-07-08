import React from 'react'
import classes from './Navbar.module.css'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    const links = [
        {url: '/overview', name: 'Обзор'}, 
        {url: '/analytics', name: 'Аналитика'}, 
        {url: '/history', name: 'История'}, 
        {url: '/order', name: 'Добавить заказ'}, 
        {url: '/categories', name: 'Ассортимент'}
    ]
    return (
        <ul className="sidenav sidenav-fixed a-sidenav">
            <h4>Newborn</h4>
            {
                links.map((item, i) => {
                    return (
                        <li key={i} className="bold"><NavLink to={item.url} className="waves-effect waves-orange" activeClassName={classes.active}>{item.name}</NavLink></li>
                    )
                })
            }
            <li className="bold last"><NavLink to='/logout' className="waves-effect waves-orange">Выйти</NavLink></li>
        </ul>
    )
}

export default Navbar