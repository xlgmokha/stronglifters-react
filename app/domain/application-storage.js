import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';

export default class ApplicationStorage {
  async fetch(key) {
    const value = await AsyncStorage.getItem(key);
    console.log(`found ${key} ${value}`);
    return value;
  }

  async save(key, value) {
    try {
      console.log(`storing ${key} ${value}`);
      AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error.message);
    }
  }

  async delete(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error.message);
    }
  }
}
