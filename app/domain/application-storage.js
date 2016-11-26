import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';

export default class ApplicationStorage {
  fetch(key) {
    const value = AsyncStorage.getItem(key);
    console.log(`found ${key} ${value}`);
    return value;
  }
  save(key, value) {
    console.log(`storing ${key} ${value}`);
    AsyncStorage.setItem(key, value);
  }
}
