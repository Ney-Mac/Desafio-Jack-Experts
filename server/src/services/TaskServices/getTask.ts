import { NotFoundError } from "../../errors/ApiErrors";
import TaskModel from "../../models/TaskModel"
import { isSameUser } from "../../utils/isSameUser";
import { validateTaskId } from "../../utils/validateTaskId"

export const getTaskById = async (userId: string, taskId: string) => {
    validateTaskId(taskId);

    const task = await TaskModel.findById(taskId);

    if (!task || !isSameUser(task.userId, userId)) {
        throw new NotFoundError('Tarefa não encontrada.');
    }

    console.log('Tarefa encontrada por ID.');
    return task;
}

export const getAllTaskOfUser = async (userId: string) => {
    const tasks = await TaskModel.find({ userId });

    if (!tasks || tasks.length === 0) {
        throw new NotFoundError('Nenhuma tarefa encontrada.');
    }

    console.log('Lista de tarefas encontrada com sucesso.');
    return tasks;
}