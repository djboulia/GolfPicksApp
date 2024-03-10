import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  static async getItem(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      console.log('getItem:', value);
      return value;
    } catch (error) {
      return undefined;
    }
  }

  static async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('setItem: ', key, value);
      return value;
    } catch (error) {
      return undefined;
    }
  }

  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      console.log('removeItem: ', key);
      return;
    } catch (error) {
      return undefined;
    }
  }
}
