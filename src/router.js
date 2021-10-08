import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import Home from '@/views/Home';
import Logout from '@/views/Logout';
import Account from '@/views/Account';
import ChangePassword from '@/views/login/ChangePassword';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                roles: []
            }
        },
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                roles: []
            }
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout,
            meta: {
                roles: []
            }
        },
        {
            path: '/account',
            name: 'account',
            component: Account,
            meta: {
                roles: []
            }
        },
        {
            path: '/change-password',
            name: 'change-password',
            component: ChangePassword,
            meta: {
                roles: []
            }
        },
        {
            path: '*',
            redirect: '/',
            meta: {
                roles: []
            }
        }
    ]
});
