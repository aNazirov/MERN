import React from 'react';  
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { autoLogin } from '../redux/actions/auth';


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (  
        <Route {...rest} render={props => {
            return (
                rest.autoLogin() 
                    ? (
                        <Redirect to={
                            {
                                pathname: '/auth/login',
                                from: props.location.pathname,
                                accessDenied: true
                            }
                        } 
                        />
                    )
                    : (
                        <Component {...props} />
                    )
                )
            }
        } 
        />
    )
}
function mDTP(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}
export default connect(null, mDTP)(PrivateRoute)