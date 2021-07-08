import React, { useEffect } from 'react'
import M from 'materialize-css'

import Authenticate from '../Authenticate/Authenticate';

const toast = (location) => {
    if (location.registered) M.toast({html: 'Теперь вы можете зайти в систему используя свои данные.'})
    
    if (location.accessDenied) M.toast({html: 'Для начала авторизуйтесь в системе.'})
    
    if (location.sessionFailed) M.toast({html: 'Пожалуйста войдите в систему заного.'})
}

const Login = ({location}) => {
    useEffect(() => {
        toast(location)
        return () => {
            M.Toast.dismissAll()
        }
    })
    
    const handleSubmit = async (values, {auth, history}) => {
        const error = await auth(values, true)
        if ( error ) return M.toast({html: error.message})
        history.push(
            { 
                pathname: location.from || '/overview'
            }
        )
    }
    return (
        <Authenticate 
            title='Войти в систему'
            button='Войти'
            isLogin={true}
            handleSubmit={handleSubmit}
        />
    )
}
export default Login

