import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  onPasswordToggle?: () => void;
  isPasswordVisible?: boolean;
  containerStyle?: any;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  showPasswordToggle = false,
  onPasswordToggle,
  isPasswordVisible = false,
  containerStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={showPasswordToggle ? styles.inputRow : styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#9ca3af"
          {...textInputProps}
        />
        {showPasswordToggle && (
          <TouchableOpacity style={styles.eyeIcon} onPress={onPasswordToggle}>
            <Icon
              name={isPasswordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="#6b7280"
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    fontSize: 16,
    color: '#111827',
    flex: 1,
    minHeight: 24, // sometimes needed for React Native spacing
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
  },
});

export default AppTextInput;
