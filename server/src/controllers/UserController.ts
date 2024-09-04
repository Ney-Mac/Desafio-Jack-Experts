import { Request, Response } from 'express';
import { UserDTO } from '../dtos/UserDTO';

import { registerUser } from '../services/UserServices/registerUser';
import { loginUser } from '../services/UserServices/loginUser';

import { BadRequestError, GenericError } from '../errors/ApiErrors';

export const UserController = {
    async register(req: Request, res: Response) {
        const { email, password }: UserDTO = req.body;

        try {
            if (!email || !password) {
                throw new BadRequestError('Precisa enviar todos os parâmetros');
            }

            const user = await registerUser({ email, password });

            res.status(200).json({
                message: 'Usuário registrado com sucesso',
                user
            });
        } catch (error) {
            console.log(error);

            if (error instanceof GenericError) {
                return res.status(error.statusCode).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async login(req: Request, res: Response) {
        const { email, password }: UserDTO = req.body;

        try {
            if (!email || !password) {
                throw new BadRequestError('Precisa enviar todos os parâmetros');
            }

            const user = await loginUser({ email, password });

            res.status(200).json({
                message: 'Usuário logado com sucesso.',
                user
            });
        } catch (error) {
            console.log(error);

            if (error instanceof GenericError) {
                return res.status(error.statusCode).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}