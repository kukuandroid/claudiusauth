import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { isValidEmail, isValidPassword, isNonEmpty } from '../utils/validators';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

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

  const validateName = (): boolean => {
    if (!isNonEmpty(name)) {
      setNameError('Name is required.');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (): boolean => {
    if (!isNonEmpty(email)) {
      setEmailError('Email is required.');
      return false;
    }
    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (): boolean => {
    if (!isNonEmpty(password)) {
      setPasswordError('Password is required.');
      return false;
    }
    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSignup = async (): Promise<void> => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await signup(name, email, password);
    } catch (error) {
      if (error instanceof Error) {
        setEmailError(error.message);
      }
    }
  };

  const handleNameBlur = (): void => {
    validateName();
  };

  const handleEmailBlur = (): void => {
    validateEmail();
  };

  const handlePasswordBlur = (): void => {
    validatePassword();
  };

  const handleNameChange = (text: string): void => {
    setName(text);
    if (nameError) setNameError('');
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string): void => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const handleNameSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ): void => {
    e.preventDefault();
    validateName();
  };

  const handleEmailSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ): void => {
    e.preventDefault();
    validateEmail();
  };

  return (
    <View style={styles.container}>
      <AppText variant="title">Create Account</AppText>
      <AppText variant="subtitle">Sign up to get started</AppText>

      <AppTextInput
        label="Name"
        value={name}
        onChangeText={handleNameChange}
        onBlur={handleNameBlur}
        onSubmitEditing={handleNameSubmit}
        placeholder="Enter your name"
        autoCapitalize="words"
        autoCorrect={false}
        error={nameError}
      />

      <AppTextInput
        label="Email"
        value={email}
        onChangeText={handleEmailChange}
        onBlur={handleEmailBlur}
        onSubmitEditing={handleEmailSubmit}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        error={emailError}
      />

      <AppTextInput
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        onBlur={handlePasswordBlur}
        placeholder="Enter your password"
        secureTextEntry={!passwordVisible}
        autoCapitalize="none"
        autoCorrect={false}
        error={passwordError}
        showPasswordToggle
        onPasswordToggle={() => setPasswordVisible(v => !v)}
        isPasswordVisible={passwordVisible}
      />

      <AppButton title="Sign Up" onPress={handleSignup} />

      <AppButton
        variant="link"
        title="Already have an account? Log in"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
  },
});

export default SignupScreen;
