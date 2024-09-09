import { BadRequestError } from "../errors/ApiErrors";

export const validatePassword = (pw: string) => {
    if (pw.length < 5) {
        throw new BadRequestError('A senha deve conter ao menos 5 caracteres.');
    }
}