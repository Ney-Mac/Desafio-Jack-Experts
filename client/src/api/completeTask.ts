import axios from 'axios';
import { API_URL } from '../config';
import { toast } from 'react-toastify';
import { useCatchError } from '../utils/useCatch';

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
        useCatchError(error, 'Complete Task');
    }
}