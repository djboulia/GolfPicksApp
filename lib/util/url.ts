// need to use our IP address in order for Android simulator to work
import { Platform } from 'react-native';
const host = Platform.OS === 'android' ? '192.168.86.244' : 'localhost';

export function getBaseUrl() {
  return `http://${host}:3000/api`;
}
