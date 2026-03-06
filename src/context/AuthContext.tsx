import React, { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);
