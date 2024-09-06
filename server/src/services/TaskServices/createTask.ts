import { TaskDTO } from "../../dtos/TaskDTO";
import TaskModel from "../../models/TaskModel";

export const createTask = async ({ title, description, user }: TaskDTO) => {
    const newTask = new TaskModel({
        title,
        description,
        userId: user.id
    });

    newTask.save();

    console.log('Tarefa criada com sucesso');
    return newTask;
}