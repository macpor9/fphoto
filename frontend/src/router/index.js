import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

let router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
});

// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/register', '/home', 'Editing'];
//     const loggedIn = localStorage.getItem('user');
// });

export default router