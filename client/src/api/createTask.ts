import axios from 'axios';
import { API_URL } from '../config';
import { TaskResponseType } from '../types/SuccessResponse';
import { toast } from 'react-toastify';
import { useCatchError } from '../utils/useCatch';

export const createTask = async (token: string, title: string, description: string) => {
    try {
        const res = await axios<TaskResponseType>({
            method: 'post',
            url: `${API_URL}/create-task`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { title, description }
        });

        console.log(res.data.message);
        toast.success(res.data.message)
    } catch (error) {
        useCatchError(error, 'Create Task');
    }
}