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
        .then((data) => {
            if (process.env.VUE_APP_VERIFY_VERSION === 'true') {
                if (data.data.app_version !== process.env.VUE_APP_GIT_HASH) {
                    return store.dispatch('alert/showAlert', {
                        message: `Uma nova versão está disponível. Recarregue a página para obter a nova versão. Sua versão: ${process.env.VUE_APP_GIT_HASH}. Nova versão: ${data.data.app_version}.`,
                        timeout: -1
                    });
                }
            }
            response = data.data;
        })
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
