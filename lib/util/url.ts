// need to use our IP address in order for Android simulator to work
// import { Platform } from 'react-native';
// const host = Platform.OS === 'android' ? 'http://192.168.86.244:3000' : 'http://localhost:3000';

export function getBaseUrl() {
  const host = process.env.EXPO_PUBLIC_API_URL;

  return `${host}/api`;
}
