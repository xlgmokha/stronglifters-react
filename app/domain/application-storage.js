import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';

export default class ApplicationStorage {
  fetch(key) {
    const value = await AsyncStorage.getItem(key);
    console.log(`found ${key} ${value}`);
    return value;
  }
  save(key, value) {
    console.log(`storing ${key} ${value}`);
    AsyncStorage.setItem(key, value);
  }
}
