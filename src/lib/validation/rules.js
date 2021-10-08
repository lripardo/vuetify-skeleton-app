import {MIN_PASSWORD_LENGTH} from '@/lib/validation/constants';

export const NOT_EQUAL_PASSWORDS = 'As senhas não conferem';
export const INVALID_PASSWORD = 'Senha inválida';
export const TOO_MANY_ATTEMPTS = 'Muitas tentativas não autorizadas. Tente novamente mais tarde.';
export const rulePassword = p => typeof p === 'string' && p.length >= MIN_PASSWORD_LENGTH || INVALID_PASSWORD;
export const ruleConfirmPassword = password => {
    return p => typeof p === 'string' && password.value === p || NOT_EQUAL_PASSWORDS;
};
