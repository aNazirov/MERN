import React from 'react'
import Fab from '../components/Fab/Fab'
import Navbar from '../components/Navbar/Navbar'

const Layout = props => {
    console.log(props)
    return (
        <div className="Overview">
            <Navbar />
            <main className="content">
                {props.children}
            </main>
            <Fab />
        </div>
    )
}
export default Layout