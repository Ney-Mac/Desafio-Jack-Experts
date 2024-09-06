import { Request, Response } from "express";
import { TaskDTO } from "../dtos/TaskDTO";

import { BadRequestError, GenericError } from "../errors/ApiErrors";

import { createTask } from "../services/TaskServices/createTask";
import { editTask } from "../services/TaskServices/editTask";

export const TaskController = {
    async create(req: Request, res: Response) {
        const { title, description, user }: TaskDTO = req.body;

        try {
            if (!title || !description) {
                throw new BadRequestError('Precisa enviar todos os parâmetros.');
            }

            const task = await createTask({ title, description, user });

            res.status(200).json({
                message: 'Tarefa criada com sucesso.',
                task
            });
        } catch (error) {
            console.log(error);

            if (error instanceof GenericError) {
                return res.status(error.statusCode).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async edit(req: Request, res: Response) {
        const { title, description, user }: TaskDTO = req.body;
        const { id } = req.params;

        try {
            if (!title && !description) {
                throw new BadRequestError('Precisa enviar ao menos um dos parâmetros.');
            }

            const refatoredTask = await editTask({ title, description, user, id });

            res.status(200).json({
                message: 'Tarefa atualizada com sucesso.',
                refatoredTask
            });
        } catch (error) {
            console.log(error);

            if (error instanceof GenericError) {
                return res.status(error.statusCode).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    editBadRequest(req: Request, res: Response) {
        return res.status(400).json({ message: 'Precisa enviar o id da tarefa a editar.' });
    },

    async getAll(req: Request, res: Response) { },

    async markAsConcluded(req: Request, res: Response) { },

    async delet(req: Request, res: Response) { },
}