import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { UserResponse, AuthResponse, CreateUserInput, LoginInput } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: UserResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: CreateUserInput) => Promise<void>;
  logout: () => void;
  updateUser: (user: UserResponse) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser) as UserResponse;
          setUser(userData);
          
          await apiService.getProfile();
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginInput): Promise<void> => {
    const authResponse: AuthResponse = await apiService.login(data);
    
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
    setUser(authResponse.user);
  };

  const register = async (data: CreateUserInput): Promise<void> => {
    const authResponse: AuthResponse = await apiService.register(data);
    
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
    setUser(authResponse.user);
  };

  const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedUser: UserResponse): void => {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
