import { jsx as _jsx } from "react/jsx-runtime";
// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { getUserFromStorage, saveUserToStorage, clearUserFromStorage } from "./auth";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const stored = getUserFromStorage();
        if (stored)
            setUser(stored);
    }, []);
    const login = (u) => {
        setUser(u);
        saveUserToStorage(u);
    };
    const logout = () => {
        setUser(null);
        clearUserFromStorage();
    };
    return (_jsx(AuthContext.Provider, { value: { user, login, logout }, children: children }));
};
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
