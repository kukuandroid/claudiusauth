import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface AppTextProps {
  children: React.ReactNode;
  variant?: 'title' | 'subtitle' | 'label' | 'body' | 'error' | 'link';
  style?: TextStyle;
  onPress?: () => void;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  style,
  onPress,
}) => {
  const textStyle = [styles[variant], style];

  if (onPress) {
    return (
      <Text style={textStyle} onPress={onPress}>
        {children}
      </Text>
    );
  }

  return <Text style={textStyle}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#6b7280',
  },
  error: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
  },
  link: {
    color: '#4f46e5',
    fontWeight: '600',
  },
});

export default AppText;
