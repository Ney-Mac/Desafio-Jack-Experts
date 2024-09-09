import { UserType } from "./User";

export type AuthResponseType = {
    message: string;
    user: UserType;
}

export type TaskResponseType = {
    message: string;
    tasks: {
        title: string;
        description: string;
        _id: string;
    }[]
}