import axios from 'axios';
import { API_URL } from '../config';
import { TaskResponseType } from '../types/SuccessResponse';
import { toast } from 'react-toastify';
import { useCatchError } from '../utils/useCatch';

export const editTask = async (token: string, id: string, title?: string, description?: string) => {
    try {
        const res = await axios<TaskResponseType>({
            method: 'patch',
            url: `${API_URL}/edit-task/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { title, description }
        });

        toast.success(res.data.message);
    } catch (error) {
        useCatchError(error, 'Edit Task');
    }
}