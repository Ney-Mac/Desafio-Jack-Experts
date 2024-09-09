import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from "../config";

import { AuthResponseType } from "../types/SuccessResponse";
import { UserType } from "../types/User";

import { toast } from 'react-toastify';

import { useRefresh } from "../utils/useRefresh";

type Props = {
    children: React.ReactNode;
}

type AuthProps = {
    login: (email: string, password: string) => void;
    register: (email: string, password: string) => void;
    logout: () => void;
    user?: UserType;
}

export const AuthContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const { setRefresh } = useRefresh();
    const [user, setUser] = useState<UserType>();

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post<AuthResponseType>(`${API_URL}/login`, {
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);

            setRefresh(true);
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('Opps! Ocorreu algum erro.');
            }
        }
    }

    const register = async (email: string, password: string) => {
        try {
            const res = await axios.post<AuthResponseType>(`${API_URL}/register`, {
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);

            setRefresh(false);
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('Opps! Ocorreu algum erro.');
            }
        }
    }

    const splashLoad = () => {
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setRefresh(true);
        }
    }

    const logout = () => {
        setUser(undefined);
        localStorage.removeItem('user');

        toast.success('Sessão terminada.');
    }

    useEffect(() => {
        splashLoad()
    }, []);

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                logout,
                user
            }}
        >{children}</AuthContext.Provider>
    )
}