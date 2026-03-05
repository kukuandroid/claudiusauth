import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <AppText style={styles.avatarText}>
            {user?.name.charAt(0).toUpperCase()}
          </AppText>
        </View>
        <AppText style={styles.title}>Welcome!</AppText>
      </View>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="person" size={20} color="#6b7280" />
            <AppText style={styles.infoLabel}>Name</AppText>
          </View>
          <AppText style={styles.infoValue}>{user?.name}</AppText>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#6b7280" />
            <AppText style={styles.infoLabel}>Email</AppText>
          </View>
          <AppText style={styles.infoValue}>{user?.email}</AppText>
        </View>
      </View>

      <AppButton
        variant="danger"
        title="Logout"
        onPress={logout}
        iconName="logout"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginLeft: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 28,
  },
});

export default HomeScreen;
