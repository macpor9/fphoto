import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// import axios from "@/config/axios.config";
// import axios from "axios";


Vue.use(VueRouter);

let router = new VueRouter({
    routes,
    mode: 'history',
    linkActiveClass: 'active',
});



router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})


export default router