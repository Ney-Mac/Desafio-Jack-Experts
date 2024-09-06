import { UserDTO } from "../../dtos/UserDTO";
import { UserType } from "../../types/ResponseType";
import UserModel from "../../models/UserModel";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UnauthorizedError } from "../../errors/ApiErrors";

dotenv.config();

export const loginUser = async ({ email, password }: UserDTO) => {
    let user = await UserModel.findOne({ email });

    if (!user) {
        throw new UnauthorizedError('Credenciais inválidas');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new UnauthorizedError('Credenciais inválidas');
    }

    const payload = {
        emai: user.email,
        id: user._id
    }

    const token = jwt.sign(
        payload,
        String(process.env.JWT_SECRET),
        { expiresIn: '24h' }
    );

    console.log('Usuário logado com sucesso.');

    const resUser: UserType = {
        id: user._id as string,
        email: user.email,
        token
    }

    return resUser;
}