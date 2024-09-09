import axios from 'axios';
import { toast } from 'react-toastify';

export const useCatchError = (error: any, site: string) => {
    console.error(`${site} error: ${error}`);

    if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response?.data.message);
    } else {
        toast.error('Opps! Ocorreu algum erro.');
    }
}