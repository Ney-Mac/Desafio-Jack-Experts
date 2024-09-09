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

            const parseRes = res.data.tasks.map(task => {
                const parseTask: TaskType = {
                    title: task.title,
                    description: task.description,
                    id: task._id,
                    complete: task.complete
                }

                return parseTask;
            });
            
            toast.success(res.data.message)
            setState(parseRes);
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