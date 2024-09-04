import { Response, NextFunction } from "express";
import { CustomRequest } from '../types/CustomRequest';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { UnauthorizedError, GenericError } from "../errors/ApiErrors";

dotenv.config();

export function authMidleware(req: CustomRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader) {
            throw new UnauthorizedError('Acesso negado.');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);

        if (error instanceof GenericError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        return res.status(500).json({ message: 'Internal Server Error' });
    }
}