import { Types } from "mongoose";
import { NotFoundError } from "../errors/ApiErrors";

export const validateTaskId = (id: string) => {
    if(!Types.ObjectId.isValid(id)) {
        throw new NotFoundError('ID de tarefa inválido. Envie um ID válido.');
    }
    return;
}