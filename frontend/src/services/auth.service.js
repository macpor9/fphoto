// import axios from '@/config/axios.config';
// import axios from "axios";
import Vue from "vue";

const API_URL = 'http://localhost:8080/api/auth/';


class AuthService {
    login(user) {
        return Vue.axios
            .post(API_URL + 'signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    getUser(){
        return Vue.axios.get(API_URL + 'user')
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return Vue.axios.post(API_URL + 'signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            starterId: user.starterId
        });
    }
}

export default new AuthService();