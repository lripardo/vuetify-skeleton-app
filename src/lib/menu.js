import {goToAccount, goToHome} from '@/lib/redirects';

export const home = () => {
    return {
        title: 'Inicial',
        text: '',
        button: '',
        img: '',
        icon: 'mdi-home',
        click: () => {
            goToHome();
        }
    }
};

export const account = () => {
    return {
        title: 'Conta',
        text: 'Realize alterações de senha, nome e outros.',
        button: 'Gerenciar sua conta',
        icon: 'mdi-account',
        img: 'user-profile.svg',
        click: () => {
            goToAccount();
        }
    }
};
