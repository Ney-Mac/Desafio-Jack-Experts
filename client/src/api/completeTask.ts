import axios from 'axios';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

export const completeTask = async (id: string, token: string, status: boolean) => {
    try {
        const res = await axios({
            method: 'patch',
            url: `${API_URL}/task/${id}/completed`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { completed: status }
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