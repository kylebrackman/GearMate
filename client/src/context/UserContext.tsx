import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getUserApi } from '../services/UserApi';
import { User } from '../models/UserModel';

interface UserProviderProps {
    children: ReactNode;
}
interface UserContextType {
    user: User | null;
    login: (user: User | null) => void;
}
const defaultContextValue: UserContextType = {
    user: null,
    login: () => {},
}

export const UserContext = createContext<UserContextType>(defaultContextValue);

// Custom hook for consuming the context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

// Context provider component

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    
    const [user, setUser] = useState<User | null>(null);

    const login = (user: User | null) => {
        if (user) {
          setUser(user);
        }
      };
      console.log(user)
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
        <UserContext.Provider value={{ user, login }} >
            {children}
        </UserContext.Provider>
    )
}

