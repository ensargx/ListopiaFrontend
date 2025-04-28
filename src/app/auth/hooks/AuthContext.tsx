// AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from '@/types/user';
import { getUserFromStorage, saveUserToStorage, clearUserFromStorage } from "../../../lib/auth";
import {fetchFriendsByUUID} from "@/api/userapi";
import {PaginatedResponse} from "@/types/friends";

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
    const [uuid, setUuid] = useState<string | null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [sendingRequests, setSentRequests] = useState<User[]>([]);
    const [receivedRequests, setReceivedRequests] = useState<User[]>([]);

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

    const handleFriendAdded = (f: User) => {
        setFriends(prevFriends => [f, ...prevFriends]);
    };

    const handleRequestsReceived = (f: User) => {
        setReceivedRequests(prevReceivedRequests => [f, ...prevReceivedRequests]);
    };

    const handleRequestsSend = (f: User) => {
        setSentRequests(prevSentRequests => [f, ...prevSentRequests]);
    };

    useEffect(() => {
        if(user){
            setUuid(user?.uuid)
        }else{
            setUuid(null);
        }
    }, [user]);

    const fetchAllFriends = async (uuid: string, fetcher: typeof fetchFriendsByUUID) => {
        let page = 0;
        let allFriends: User[] = [];
        let hasMorePages = true;

        while (hasMorePages) {
            const pagedResult = await fetcher(uuid, page);

            // Burada her sayfadaki friends için işlem yapabilirsin
            pagedResult.content.forEach(friend => {
                console.log('Friend:', friend);
                // Burada friend için istediğin işlemi yapabilirsin
            });

            allFriends = [...allFriends, ...pagedResult.content];

            // Eğer son sayfaysa dur
            hasMorePages = !pagedResult.last;
            page += 1; // Sonraki sayfaya geç
        }

        return allFriends;
    };

    const fetchAllReceivedFriendRequests = async (uuid: string, fetcher: typeof fetchFriendsByUUID) => {
        let page = 0;
        let allFriends: User[] = [];
        let hasMorePages = true;

        while (hasMorePages) {
            const pagedResult = await fetcher(uuid, page);

            // Burada her sayfadaki friends için işlem yapabilirsin
            pagedResult.content.forEach(friend => {
                console.log('Friend:', friend);
                // Burada friend için istediğin işlemi yapabilirsin
            });

            allFriends = [...allFriends, ...pagedResult.content];

            // Eğer son sayfaysa dur
            hasMorePages = !pagedResult.last;
            page += 1; // Sonraki sayfaya geç
        }

        return allFriends;
    };



    useEffect(() => {
        if(!uuid){
            setFriends([]);
            setReceivedRequests([]);
            setSentRequests([]);
            return;
        }
        fetchAllFriends(uuid, fetchFriendsByUUID).then(setFriends);
    }, [uuid]);

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
