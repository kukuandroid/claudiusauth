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
import { isValidEmail, isNonEmpty } from '../utils/validators';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

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
    setPasswordError('');
    return true;
  };

  const handleLogin = async (): Promise<void> => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setEmailError(error.message);
      }
    }
  };

  const handleEmailBlur = (): void => {
    validateEmail();
  };

  const handlePasswordBlur = (): void => {
    validatePassword();
  };

  const handleEmailChange = (text: string): void => {
    setEmail(text);
    if (emailError) setEmailError('');
  };

  const handlePasswordChange = (text: string): void => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const handleEmailSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ): void => {
    e.preventDefault();
    validateEmail();
  };

  return (
    <View style={styles.container}>
      <AppText variant="title">Welcome back</AppText>
      <AppText variant="subtitle">Sign in to continue</AppText>

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

      <AppButton title="Login" onPress={handleLogin} />

      <AppButton
        variant="link"
        title="Don't have an account? Sign up"
        onPress={() => navigation.navigate('Signup')}
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

export default LoginScreen;
