import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getUserApi } from '../services/UserApi';
import { User } from '../models/UserModel';
interface UserContextType {
    user: User | null;
}

const defaultContextValue: UserContextType = {
    user: null
}

const UserContext = createContext<UserContextType>(defaultContextValue);

// Custom hook for consuming the context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Context provider component
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserApi();
                console.log(user)
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user }} >
            {children}
        </UserContext.Provider>
    )
}