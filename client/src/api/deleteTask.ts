import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

export const deleteTask = async (id: string, token: string) => {
    try {
        const res = await axios({
            method: 'delete',
            url: `${API_URL}/delete-task/${id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
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