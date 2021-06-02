import axios from 'axios';

axios.interceptors.request.use(function (config) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        config.headers.Authorization = user.accessToken
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
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

export default axios;