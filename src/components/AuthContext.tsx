// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from '@/types/user';
import { getUserFromStorage, saveUserToStorage, clearUserFromStorage } from "../lib/auth";

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}

// Burada children’ı tanımlıyoruz:
interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = getUserFromStorage();
        if (stored) setUser(stored);
    }, []);

    const login = (u: User) => {
        setUser(u);
        saveUserToStorage(u);
    };

    const logout = () => {
        setUser(null);
        clearUserFromStorage();
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
