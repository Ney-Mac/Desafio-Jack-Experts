import { isEmail } from 'validator';

export function validateEmail(email: string) {
    if (email.length === 0) {
        return 'Preencha este campo.';
    } else if (!isEmail(email)) {
        return 'Email inválido. Digite um email válido.'
    }
    return '';
}

export function validatePassword(password: string) {
    if (password.length === 0) {
        return 'Preencha este campo.';
    } else if (password.length < 5) {
        return 'A senha deve conter ao menos 5 caracteres.';
    }
    return '';
}