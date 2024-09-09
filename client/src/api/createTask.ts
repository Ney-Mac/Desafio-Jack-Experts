import axios from 'axios';
import { API_URL } from '../config';
import { TaskResponseType } from '../types/SuccessResponse';
import { toast } from 'react-toastify';

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
        console.log(error);

        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error('Opps! Ocorreu algum erro.');
        }
    }
}