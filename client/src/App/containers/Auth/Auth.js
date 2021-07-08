import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Login from './Login/Login';
import Register from './Register/Register';

const Auth = ({match}) => {
    return (
        <div className="Auth">
            <Header />
            <div className="auth-block">
                <Switch>
                    <Route path={`${match.path}/login`} component={Login} />
                    <Route path={`${match.path}/register`} component={Register} />
                    <Redirect to={`${match.path}/login`}/>
                </Switch>
            </div>
        </div>
    )
}

export default Auth
