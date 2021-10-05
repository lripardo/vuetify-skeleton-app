import {client, request} from '@/lib/backend/http';

export const postLogin = (credentials) => {
    return request(client().post, '/auth/login', credentials, false);
};

export const postLogout = () => {
    return request(client().post, '/auth/logout');
};

export const postRegister = (user) => {
    return request(client().post, '/auth/register', user);
};

export const putChangePassword = (credentials) => {
    return request(client().put, '/auth/change-password', credentials, false);
}
