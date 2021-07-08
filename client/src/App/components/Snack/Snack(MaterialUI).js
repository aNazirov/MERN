import { IconButton, Snackbar } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { snack } from '../../redux/actions/snackbar';
import Login from './Login/Login';
import Register from './Register/Register';

class Auth extends Component {
    setSnackIsOpen = () => {
            this.props.snack(null, false)
    }
render() {
    return (
        <div className="Auth">
            <Header />
            <div className="auth-block">
                <Switch>
                    <Route path={`${this.props.match.path}/login`} component={Login} />
                    <Route path={`${this.props.match.path}/register`} component={Register} />
                    <Redirect to={`${this.props.match.path}/login`}/>
                </Switch>
            </div>
            <div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.props.snackIsOpen} 
                    autoHideDuration={3000}
                    onClose={this.setSnackIsOpen}
                    message={this.props.snackMsg}
                    action={
                        [
                            <IconButton
                                key='close'
                                aria-label='Close'
                                color='inherit'
                                onClick={this.setSnackIsOpen}
                            >
                                x
                            </IconButton>
                        ]
                    }
                />
            </div>
        </div>
    )
}
}
function mSTP(state) {
    return {
        snackIsOpen: state.snack.snackIsOpen,
        snackMsg: state.snack.snackMsg
    }
}
function mDTP(dispatch) {
    return {
        snack: (msg, isOpen) => dispatch(snack(msg, isOpen))
    }
}
export default connect(mSTP, mDTP)(Auth)
