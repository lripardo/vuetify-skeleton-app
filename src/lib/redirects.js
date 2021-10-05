import router from '@/router';

const getRouteByName = name => {
    const routerArray = router.options.routes.filter(r => r.name === name);
    if (routerArray.length) {
        return routerArray[0].path;
    }
    return '/';
};

const goTo = route => {
    if (typeof route === 'string') {
        route = getRouteByName(route);
    }
    router.push(route).catch(() => {
    });
};

export const goToLogin = () => {
    goTo('login');
};

export const goToLogout = () => {
    goTo('logout');
};

export const goToHome = () => {
    goTo('home');
};

export const goToAccount = () => {
    goTo('account');
};

export const goToChangePassword = () => {
    goTo('change-password');
}

