import { UserDTO } from "../../dtos/UserDTO";
import { UserType } from "../../types/ResponseType";
import UserModel from "../../models/UserModel";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { validate } from 'deep-email-validator';

import { ConflictError, BadRequestError } from "../../errors/ApiErrors";
import { validatePassword } from "../../utils/validatePassword";

dotenv.config();

export const registerUser = async ({ email, password }: UserDTO) => {
    const res = await validate({
        email: email,
        sender: email,
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: false,
        validateSMTP: false,
    });

    if (!res.valid) {
        throw new BadRequestError('Email inválido. Digite um email válido.');
    }

    validatePassword(password);

    let user = await UserModel.findOne({ email });

    if (user) {
        throw new ConflictError('Este usuário já existe. Tente outro.');
    }

    user = new UserModel({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(
        payload,
        String(process.env.JWT_SECRET),
        { expiresIn: '24h' }
    );

    console.log('Usuário registrado com sucesso.');

    const resUser: UserType = {
        id: user._id as string,
        email: user.email,
        token
    }

    return resUser;
}