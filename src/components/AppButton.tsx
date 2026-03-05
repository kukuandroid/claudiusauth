import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { MaterialIcons as Icon } from '@react-native-vector-icons/material-icons';

type IconName = React.ComponentProps<typeof Icon>['name'];

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'link' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  iconName?: IconName;
  iconSize?: number;
  accessibilityLabel?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
  iconName,
  iconSize = 20,
  accessibilityLabel,
}) => {
  const buttonStyle = [styles[variant], style, disabled && styles.disabled];
  const buttonTextStyle = [styles[`${variant}Text`], textStyle];
  
  // Get the appropriate icon color based on variant
  const getIconColor = (): string => {
    switch (variant) {
      case 'link':
        return '#6b7280';
      case 'danger':
        return '#ffffff';
      case 'primary':
      default:
        return '#ffffff';
    }
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityRole="button"
    >
      {iconName ? (
        <View style={styles.buttonContent}>
          <Icon name={iconName} size={iconSize} color={getIconColor()} />
          <Text style={buttonTextStyle}>{title}</Text>
        </View>
      ) : (
        <Text style={buttonTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#6b7280',
  },
  danger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc2626',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 24,
  },
  dangerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default AppButton;
