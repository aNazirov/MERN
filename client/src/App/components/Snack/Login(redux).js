import React, { useState } from 'react'
import { connect } from 'react-redux';
import { snack } from '../../../redux/actions/snackbar';
import Authenticate from '../Authenticate/Authenticate';


const Login = props => {
    const handleSubmit = async (values, childProps) => {
        const error = await childProps.auth(values, true)
        if ( error ) return props.snack(error.message)
        childProps.history.push(
            { 
                pathname: props.location.from || '/overview'
            }
        )
    }

    useState(() => {
        if (props.location.registered) return props.snack('Теперь вы можете зайти в систему используя свои данные.')
        
        if (props.location.accessDenied) return props.snack('Для начала авторизуйтесь в системе.')

        if (props.location.sessionFailed) return props.snack('Пожалуйста войдите в систему заного.')
    })

    return (
        <Authenticate 
                title='Войти в систему'
                button='Войти'
                isLogin={true}
                handleSubmit={handleSubmit}
        />
    )
}
function mDTP(dispatch) {
    return {
        snack: (isOpen, msg) => dispatch(snack(isOpen, msg))
    }
}
export default connect(null, mDTP)(Login)

