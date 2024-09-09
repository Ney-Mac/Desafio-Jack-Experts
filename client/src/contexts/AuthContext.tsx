import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { API_URL } from "../config";

import { AuthResponseType } from "../types/SuccessResponse";
import { UserType } from "../types/User";

import { toast } from 'react-toastify';
import { useCatchError } from "../utils/useCatch";
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
    const { setRefresh, setIsLoading } = useRefresh();
    const [user, setUser] = useState<UserType>();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await axios.post<AuthResponseType>(`${API_URL}/login`, {
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);

            setRefresh(true);
            setIsLoading(false);
        } catch (error) {
            useCatchError(error, 'Login');
            setIsLoading(false);
        }
    }

    const register = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await axios.post<AuthResponseType>(`${API_URL}/register`, {
                email,
                password
            });

            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);

            setRefresh(false);
            setIsLoading(false);
        } catch (error) {
            useCatchError(error, 'Register');
            setIsLoading(false);
        }
    }

    const splashLoad = () => {
        setIsLoading(true);
        const savedUser = localStorage.getItem('user');

        if (savedUser) {
            setUser(JSON.parse(savedUser));
            setRefresh(true);
        }
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setUser(undefined);
        localStorage.removeItem('user');

        toast.success('Sessão terminada.');
        setIsLoading(false);
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