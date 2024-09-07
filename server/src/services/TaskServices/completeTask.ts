import { NotFoundError } from "../../errors/ApiErrors";
import TaskModel from "../../models/TaskModel"

import { validateTaskId } from "../../utils/validateTaskId";
import { isSameUser } from "../../utils/isSameUser";

export const completeTask = async (userId: string, taskId: string, completed: boolean) => {
    validateTaskId(taskId);

    const task = await TaskModel.findById(taskId);

    if (!task || !isSameUser(task.userId, userId)) {
        throw new NotFoundError('Tarefa não encontrada.');
    }

    task.complete = completed;

    const updatedTask = await task.save();

    console.log('Estado da tarefa atualizado.');
    return updatedTask;
}