import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, StoredUser, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const usersRef = useRef<StoredUser[]>([]); // in-memory user store

  // Restore persisted session on mount
  useEffect(() => {
    AsyncStorage.getItem('user').then(raw => {
      if (raw) {
        const user = JSON.parse(raw);
        setUser(user);
      }
      setIsLoading(false);
    });
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const found = usersRef.current.find(
      u => u.email === email && u.password === password
    );
    if (!found) {
      throw new Error('Invalid email or password.');
    }
    const loggedIn: User = { name: found.name, email: found.email };
    setUser(loggedIn);
    await AsyncStorage.setItem('user', JSON.stringify(loggedIn));
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    const exists = usersRef.current.some(u => u.email === email);
    if (exists) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: StoredUser = { name, email, password };
    usersRef.current.push(newUser);
    const loggedIn: User = { name, email };
    setUser(loggedIn);
    await AsyncStorage.setItem('user', JSON.stringify(loggedIn));
  };

  const logout = (): void => {
    setUser(null);
    AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — throws if used outside AuthProvider
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
