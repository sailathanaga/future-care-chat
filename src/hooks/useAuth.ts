import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return mock auth for demo purposes
    const [user, setUser] = useState<User | null>(() => {
      const stored = localStorage.getItem('doctorcare-user');
      return stored ? JSON.parse(stored) : null;
    });

    const login = async (email: string, password: string): Promise<boolean> => {
      // Mock login - in real app, this would call your Python backend
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email,
          address: 'Demo Address'
        };
        setUser(mockUser);
        localStorage.setItem('doctorcare-user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    };

    const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
      // Mock registration - in real app, this would call your Python backend
      if (userData.email && userData.password && userData.name) {
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          address: userData.address
        };
        setUser(newUser);
        localStorage.setItem('doctorcare-user', JSON.stringify(newUser));
        return true;
      }
      return false;
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('doctorcare-user');
    };

    return {
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout
    };
  }
  return context;
};