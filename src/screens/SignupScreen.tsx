import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { isValidEmail, isValidPassword, isNonEmpty } from '../utils/validators';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
