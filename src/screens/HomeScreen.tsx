import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <AppText style={styles.avatarText}>
                {user?.name.charAt(0).toUpperCase()}
              </AppText>
            </View>
          </View>
          <AppText style={styles.greeting}>Welcome back,</AppText>
          <AppText style={styles.userName}>{user?.name}</AppText>
        </View>

        <View style={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.iconContainer}>
              <FontAwesomeFreeSolid name="user" size={18} color="#4f46e5" />
            </View>
            <View style={styles.infoTextContainer}>
              <AppText style={styles.infoLabel}>Full Name</AppText>
              <AppText style={styles.infoValue}>{user?.name}</AppText>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={[styles.iconContainer, styles.iconContainerAlt]}>
              <FontAwesomeFreeSolid name="envelope" size={18} color="#c026d3" />
            </View>
            <View style={styles.infoTextContainer}>
              <AppText style={styles.infoLabel}>Email Address</AppText>
              <AppText style={styles.infoValue}>{user?.email}</AppText>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <AppButton
            variant="danger"
            title="Log Out"
            onPress={logout}
            iconName="logout"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    backgroundColor: '#f3f4f6',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  avatarContainer: {
    padding: 4,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainerAlt: {
    backgroundColor: '#fdf4ff',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  footer: {
    paddingBottom: 24,
  },
});

export default HomeScreen;
