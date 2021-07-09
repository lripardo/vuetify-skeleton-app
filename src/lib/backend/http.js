import store from '@/store';
import httpLib from 'axios';
import {goToLogin} from '@/lib/redirects';

export const client = () => {
    return httpLib.create({
        baseURL: process.env.VUE_APP_BACKEND,
        withCredentials: true
    });
};

export const request = async (method, url, data = null, redirectLogin = true) => {
    let response = null;
    await method(url, data)
        .then((data) => (response = data.data))
        .catch(() => (store.dispatch('alert/showAlert', {
            message: 'Ocorreu um erro. Tente novamente mais tarde.',
            timeout: -1
        })));
    if (redirectLogin) {
        if (response) {
            if (response.status === 401) {
                await store.dispatch('alert/showAlert', {
                    message: 'Sessão expirada. Faça o login para continuar.'
                });
                response = null;
                goToLogin();
            }
        }
    }
    return response;
};

export const fetchInitialData = () => {
    return request(client().get, '', null, false);
}
