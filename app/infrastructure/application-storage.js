import { AsyncStorage } from 'react-native';

export default class ApplicationStorage {
  fetch(key) {
    return this.safelyRun(() => {
      return AsyncStorage.getItem(key);
    });
  }

  async save(key, value) {
    this.safelyRun(() => {
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
