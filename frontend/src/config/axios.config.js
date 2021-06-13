import axios from 'axios';

const myAxios = axios.create()

myAxios.defaults.headers = {
    'Access-Control-Allow-Origin': "http://localhost:8080",
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type'
}

window.console.log("ssss")

myAxios.interceptors.request.use(function (config) {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (user && user.accessToken) {
        config.headers.Authorization = "Bearer " + user.accessToken
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

myAxios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        console.log("Session Expired")
        localStorage.removeItem('user')
        window.location = '/login';
    } else {
        return Promise.reject(error);
    }
});

export default myAxios