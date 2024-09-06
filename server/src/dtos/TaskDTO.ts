import jwt from 'jsonwebtoken';

export type TaskDTO = {
    title: string;
    description: string;
    user: jwt.JwtPayload;
}