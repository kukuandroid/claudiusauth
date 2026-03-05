import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AppText from '../components/AppText';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <AppText style={styles.text}>Loading...</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});

export default LoadingScreen;
