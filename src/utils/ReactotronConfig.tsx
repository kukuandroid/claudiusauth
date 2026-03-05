import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Only enable Reactotron in development mode
const reactotron = __DEV__
  ? Reactotron
      .setAsyncStorageHandler(AsyncStorage) // AsyncStorage tracking
      .configure({
        name: 'ClaudiusAuthApp', // App name for identification
      })
      .useReactNative() // Add all built-in react native plugins
      .connect() // Let's connect!
  : null;

export default reactotron;
