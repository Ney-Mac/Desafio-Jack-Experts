import { Request, Response } from "express";
import { TaskDTO } from "../dtos/TaskDTO";

import { BadRequestError, GenericError } from "../errors/ApiErrors";

import { createTask } from "../services/TaskServices/createTask";
import { editTask } from "../services/TaskServices/editTask";
import { getAllTaskOfUser, getTaskById } from "../services/TaskServices/getTask";
import { completeTask } from "../services/TaskServices/completeTask";

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

    async getTask(req: Request, res: Response) {
        const { user }: TaskDTO = req.body;
        const { task_id } = req.query;

        try {
            if (task_id) {
                const task = await getTaskById(user.id, String(task_id));

                res.status(200).json({
                    message: 'Tarefa encontrada.',
                    task
                });
            } else {
                const tasks = await getAllTaskOfUser(user.id);

                res.status(200).json({
                    message: 'Lista de tarefas encontrada.',
                    tasks
                });
            }
        } catch (error) {
            console.log(error);

            if (error instanceof GenericError) {
                return res.status(error.statusCode).json({ message: error.message });
            }

            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async complete(req: Request, res: Response) {
        const { user, completed }: TaskDTO & { completed: boolean } = req.body;
        const { id } = req.params;

        try {
            if(completed === undefined || completed === null){
                throw new BadRequestError('Envie o novo estato da tarefa.');
            }

            const task = await completeTask(user.id, id, completed);

            res.status(200).json({
                message: `Tarefa ${completed ? 'concluida' : 'por concluir'}.`,
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

    async delet(req: Request, res: Response) { },
}