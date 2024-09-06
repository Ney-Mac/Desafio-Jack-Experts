import { TaskDTO } from "../../dtos/TaskDTO";
import { NotFoundError } from "../../errors/ApiErrors";
import TaskModel from "../../models/TaskModel";
import { Types } from "mongoose";

interface ITask extends TaskDTO {
    id: string;
}

export const editTask = async ({ title, description, user, id }: ITask) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundError('ID de tarefa inválido. Envie um ID válido.');
    }

    const task = await TaskModel.findById(id);

    if (!task || String(task.userId) !== String(user.id)) {
        throw new NotFoundError('Tarefa não encontrada.');
    }

    const updateTask: Partial<TaskDTO> = {}
    if (title) updateTask.title = title;
    if (description) updateTask.description = description;

    task.set(updateTask);

    const updatedTask = await task.save();

    console.log('Tarefa atualizada com sucesso.');
    return updatedTask;
}