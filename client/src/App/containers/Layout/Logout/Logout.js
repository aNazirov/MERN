import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../../../redux/actions/auth'


const Logout = props => {
    useEffect(() => {
        props.logout()
    })
    return (
        <Redirect to={'/auth/login'}/>
    )
}

function mDTP(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}
export default connect(null, mDTP)(Logout)

