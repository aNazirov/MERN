import axios from 'axios';
import history from '../../history';
import { logout } from '../redux/actions/auth';


// Создать инстанс axios
const api = axios.create({
    contentType: "application/json",
})

api.interceptors.request.use(function (config) {
    // Проверим в самом начале, есть ли токен в хранилище
    const JWTToken = localStorage.getItem('auth-token');
    // Если токен есть, то добавим заголовок к запросам
    config.headers.Authorization =  JWTToken ? JWTToken : '';

    return config;
});

api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    if (error.response.status === 401 && history.location.pathname !== '/auth/login') {
        console.log(' Token просрочен')
        logout()
        history.push(
            {
                pathname: '/auth/login',
                from: history.location.pathname,
                sessionFailed: true
            }
        )
        return 
    }
    return Promise.reject(error)
});


export default api