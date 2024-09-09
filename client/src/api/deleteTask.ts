import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import { useCatchError } from '../utils/useCatch';

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
        useCatchError(error, 'Delete Task');
    }
}