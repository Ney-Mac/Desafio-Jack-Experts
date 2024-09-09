import { createContext, useState } from "react";

type ConextProps = {
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type ProviderProps = {
    children: React.ReactNode;
}

export const RefreshContext = createContext<ConextProps | undefined>(undefined);

export const RefreshProvider = ({ children }: ProviderProps) => {
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <RefreshContext.Provider
            value={{
                refresh,
                setRefresh,
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </RefreshContext.Provider>
    )
}