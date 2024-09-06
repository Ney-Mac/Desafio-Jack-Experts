import { TaskDTO } from "../../dtos/TaskDTO";
import { NotFoundError } from "../../errors/ApiErrors";
import TaskModel from "../../models/TaskModel";

import { validateTaskId } from "../../utils/validateTaskId";
import { isSameUser } from "../../utils/isSameUser";

interface ITask extends TaskDTO {
    id: string;
}

export const editTask = async ({ title, description, user, id }: ITask) => {
    validateTaskId(id);

    const task = await TaskModel.findById(id);

    if (!task || !isSameUser(task.userId, user.id)) {
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