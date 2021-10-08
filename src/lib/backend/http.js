import store from '@/store';
import httpLib from 'axios';
import {goToLogin} from '@/lib/redirects';

export const client = () => {
    return httpLib.create({
        baseURL: process.env.VUE_APP_BACKEND,
        withCredentials: true
    });
};

export const request = async (method, url, data = null, redirectLogin = true, overlay = true) => {
    let response = null;
    if (overlay) {
        await store.dispatch('overlay/setOverlay', true);
    }
    await method(url, data)
        .then((data) => {
            if (process.env.VUE_APP_VERIFY_VERSION === 'true') {
                if (data.data.app_version !== process.env.VUE_APP_GIT_HASH) {
                    return store.dispatch('handlers/setHandlerUpdate');
                }
            }
            response = data.data;
        })
        .catch(() => {
            response = {
                app_version: process.env.VUE_APP_GIT_HASH,
                status: 500,
                message: 'Ocorreu um erro. Tente novamente mais tarde.',
                data: null
            };
        });
    if (redirectLogin && response && response.status === 401) {
        response = null;
        await store.dispatch('alert/showAlert', {
            message: 'Faça o login novamente para continuar'
        });
        goToLogin();
    }
    if (overlay) {
        await store.dispatch('overlay/setOverlay', false);
    }
    return response;
};

export const fetchInitialData = () => {
    return request(client().get, '', null, false, false);
}
