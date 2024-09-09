import axios from 'axios';
import { API_URL } from '../config';

import { TaskResponseType } from '../types/SuccessResponse';
import { TaskType } from '../types/TaskType';

import { toast } from 'react-toastify';
import { useCatchError } from '../utils/useCatch';

export const getTask = async (setState: React.Dispatch<React.SetStateAction<TaskType[]>>, token: string) => {
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
        useCatchError(error, 'Get Task');
    }
}