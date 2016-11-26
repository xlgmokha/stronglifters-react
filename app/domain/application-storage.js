import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';

export default class ApplicationStorage {
  fetch(key) {
    this.safelyRun(() => {
      const value = AsyncStorage.getItem(key);
      console.log(`found ${key} ${value}`);
      return value;
    });
  }

  save(key, value) {
    this.safelyRun(() => {
      console.log(`storing ${key} ${value}`);
      AsyncStorage.setItem(key, value);
    });
  }

  delete(key) {
    this.safelyRun(() => {
      AsyncStorage.removeItem(key);
    });
  }

  async safelyRun(block) {
    try {
      return await block();
    } catch (error) {
      console.error(error.message);
    }
  }
}
