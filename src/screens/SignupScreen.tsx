import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { isValidEmail, isValidPassword, isNonEmpty } from '../utils/validators';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { ASSETS } from '../config/assets';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { signup } = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

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

  const validateConfirmPassword = (): boolean => {
    if (!isNonEmpty(confirmPassword)) {
      setConfirmPasswordError('Please confirm your password.');
      return false;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSignup = async (): Promise<void> => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
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

  const handleConfirmPasswordBlur = (): void => {
    validateConfirmPassword();
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

  const handleConfirmPasswordChange = (text: string): void => {
    setConfirmPassword(text);
    if (confirmPasswordError) setConfirmPasswordError('');
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

  const handlePasswordSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ): void => {
    e.preventDefault();
    validatePassword();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top illustration */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={{ uri: ASSETS.images.registerIllustration }} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerContainer}>
          <AppText style={styles.title}>Sign Up</AppText>
          <AppText style={styles.subtitle}>Register to get started.</AppText>
        </View>

        <View style={styles.formContainer}>
          <AppTextInput
            value={name}
            onChangeText={handleNameChange}
            onBlur={handleNameBlur}
            onSubmitEditing={handleNameSubmit}
            placeholder="Name"
            autoCapitalize="words"
            autoCorrect={false}
            error={nameError}
            leftIconName="person-outline"
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <AppTextInput
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleEmailBlur}
            onSubmitEditing={handleEmailSubmit}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
            leftIconName="mail-outline"
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <AppTextInput
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={handlePasswordBlur}
            onSubmitEditing={handlePasswordSubmit}
            placeholder="••••••••••••"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            error={passwordError}
            showPasswordToggle
            onPasswordToggle={() => setPasswordVisible(v => !v)}
            isPasswordVisible={passwordVisible}
            leftIconName="lock-outline"
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <AppTextInput
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            placeholder="Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            error={confirmPasswordError}
            showPasswordToggle
            onPasswordToggle={() => setConfirmPasswordVisible(v => !v)}
            isPasswordVisible={confirmPasswordVisible}
            leftIconName="lock-outline"
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainerStyle}
          />

          <AppButton
            title="Sign Up" 
            onPress={handleSignup} 
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
          />

          <View style={styles.footerRow}>
            <AppText style={styles.footerText}>Already have an account? </AppText>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <AppText style={styles.signUpText}>Log in</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingBottom: 40,
    paddingTop: 60,
  },
  illustrationContainer: {
    height: 240,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#18314F',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
  },
  inputSpacing: {
    marginBottom: 20,
  },
  inputContainerStyle: {
    backgroundColor: '#f5f6f8',
    borderWidth: 0,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  signInButton: {
    backgroundColor: '#18314F',
    borderRadius: 30,
    paddingVertical: 18,
    marginTop: 12,
    shadowColor: '#18314F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
  signUpText: {
    color: '#18314F',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default SignupScreen;
