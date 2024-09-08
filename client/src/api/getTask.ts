import axios from 'axios';
import { API_URL } from '../config';

import { TaskResponseType } from '../types/SuccessResponse';
import { TaskType } from '../types/TaskType';

import { toast } from 'react-toastify';

export function getTask(setState: React.Dispatch<React.SetStateAction<TaskType[]>>, token: string) {
    const fetch = async () => {
        try {
            const res = await axios<TaskResponseType>({
                method: 'get',
                url: `${API_URL}/get-task`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data.message);
            toast.success(res.data.message)

            setState(res.data.tasks as TaskType[]);
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('Opps! Ocorreu algum erro.');
            }
        }
    }

    return fetch();
}