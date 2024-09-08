import { UserType } from "./User";
import { TaskType } from "./TaskType";

export type AuthResponseType = {
    message: string;
    user: UserType;
}

export type TaskResponseType = {
    message: string;
    tasks: TaskType | TaskType[];
}