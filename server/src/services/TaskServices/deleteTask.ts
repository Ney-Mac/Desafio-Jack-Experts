import TaskModel from "../../models/TaskModel";
import { NotFoundError } from "../../errors/ApiErrors";

import { validateTaskId } from "../../utils/validateTaskId"
import { isSameUser } from "../../utils/isSameUser"

export const deleteTask = async (userId: string, taskId: string) => {
    validateTaskId(taskId);

    const task = await TaskModel.findById(taskId);

    if(!task || !isSameUser(task.userId, userId)) {
        throw new NotFoundError('Tarefa não encontrada.');
    }

    await task.deleteOne();

    return true;
}