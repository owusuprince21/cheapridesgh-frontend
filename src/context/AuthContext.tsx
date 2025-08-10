'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, logout as performLogout } from '@/lib/auth';
import { User } from '@/types/car';

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 const initAuth = async () => {
    const currentUser = await getCurrentUser(); // supports async
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  };
  initAuth();
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    performLogout(); // clears token/localStorage
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
