import axios from 'axios';
import { API_URL } from '../config';
import { TaskResponseType } from '../types/SuccessResponse';
import { toast } from 'react-toastify';

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
        console.log(error);

        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error('Opps! Ocorreu algum erro.');
        }
    }
}