import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { getUserApi } from '../services/UserApi';
import { User } from '@/types/models.types';

interface UserProviderProps {
  children: ReactNode;
}
interface UserContextType {
  user: User | null;
  loginContext: (user: User | null) => void;
  logoutContext: () => void;
}
const defaultContextValue: UserContextType = {
  user: null,
  loginContext: () => {},
  logoutContext: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

// Custom hook for consuming the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginContext = (user: User | null) => {
    if (user) {
      setUser(user);
    }
  };

  const logoutContext = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserApi();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    void fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};
