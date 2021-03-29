import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Editing from '../pages/Editing.vue';
import Profile from "@/pages/Profile";

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/editing',
        component: Editing
    },
    {
        path: '/profile',
        component: Profile
    },

    // {
    //     path: '*',
    //     redirect: '/'
    // }
];