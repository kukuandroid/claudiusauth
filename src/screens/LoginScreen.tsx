import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { isValidEmail, isNonEmpty } from '../utils/validators';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { ASSETS } from '../config/assets';

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
      setEmailError('Username/Email is required.');
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
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ): void => {
    e.preventDefault();
    validateEmail();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={{ uri: ASSETS.images.loginIllustration }}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <View style={styles.headerContainer}>
          <AppText style={styles.title}>Login</AppText>
          <AppText style={styles.subtitle}>Please Sign in to continue.</AppText>
        </View>

        <View style={styles.formContainer}>
          <AppTextInput
            value={email}
            onChangeText={handleEmailChange}
            onBlur={handleEmailBlur}
            onSubmitEditing={handleEmailSubmit}
            placeholder="Username"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
            leftIconName="person-outline"
            containerStyle={styles.inputSpacing}
            inputContainerStyle={styles.inputContainerStyle}
          />
          <AppTextInput
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={handlePasswordBlur}
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
          <View style={styles.rememberRow} />
          <AppButton
            title="Sign In"
            onPress={handleLogin}
            style={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
          <View style={styles.footerRow}>
            <AppText style={styles.footerText}>Don't have account? </AppText>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              activeOpacity={0.7}
            >
              <AppText style={styles.signUpText}>Sign Up</AppText>
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
    height: 320,
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
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginTop: -4,
  },
  rememberText: {
    fontSize: 13,
    color: '#4b5563',
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#18314F',
    borderRadius: 30,
    paddingVertical: 18,
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

export default LoginScreen;
