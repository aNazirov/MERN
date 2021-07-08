import React, { useEffect } from 'react'
import M from 'materialize-css'

import Authenticate from '../Authenticate/Authenticate';

const Register = props => {
    useEffect(() => {
        return () => {
            M.Toast.dismissAll()
        }
    }, [])
    const handleSubmit = async (values, {auth}) => {
        const error = await auth(values, false)
        if ( error ) return M.toast({html: error.message})
        props.history.push(
            { 
                pathname: '/auth/login', 
                registered: true 
            }
        )
    }
    
    return (
        <Authenticate 
            title='Создать аккаунт'
            button='Создать'
            isLogin={false}
            handleSubmit={handleSubmit}
        />
    )
}
export default Register