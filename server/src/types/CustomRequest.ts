import { Request } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user: string | jwt.JwtPayload;
}