import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, StoredUser, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const usersRef = useRef<StoredUser[]>([]); // in-memory user store

  // Restore persisted session on mount
  useEffect(() => {
    AsyncStorage.getItem('user').then(raw => {
      if (raw) setUser(JSON.parse(raw));
    });
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const found = usersRef.current.find(
      u => u.email === email && u.password === password
    );
    if (!found) throw new Error('Invalid email or password.');
    const loggedIn: User = { name: found.name, email: found.email };
    setUser(loggedIn);
    await AsyncStorage.setItem('user', JSON.stringify(loggedIn));
  };
