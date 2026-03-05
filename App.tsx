import React from 'react';
import './src/utils/ReactotronConfig'; // Initialize Reactotron
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App: React.FC = () => (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
);

export default App;
