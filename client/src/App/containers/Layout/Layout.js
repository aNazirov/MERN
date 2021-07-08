import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Overview from './Overview/Overview'
import Logout from './Logout/Logout'
import History from './History/History'
import Analytics from './Analytics/Analytics'
import Order from './Order/Order'
import Categories from './Categories/Categories'
import CategoriesNew from './Categories/CategoriesNew/CategoriesNew'
import Fab from '../../components/Fab/Fab'

const Layout = () => {
    return (
        <div className="Overview">
            <Navbar />
            <main className="content">
                <Switch>
                    <Route path='/overview' component={Overview}/>
                    <Route path='/analytics' component={Analytics}/>
                    <Route path='/order' component={Order}/>
                    <Route path='/categories' component={Categories} exact/>
                    <Route path='/categories/new' component={CategoriesNew}/>
                    <Route path='/categories/:id' component={CategoriesNew}/>
                    <Route path='/history' component={History}/>
                    <Route path='/logout' component={Logout}/>
                    <Redirect to={'/overview'}/>
                </Switch>
            </main>
            <Fab />
        </div>
    )
}
export default Layout