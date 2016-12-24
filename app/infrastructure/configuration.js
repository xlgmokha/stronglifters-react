import Config from 'react-native-config';

export default class Configuration {
  constructor(environment) {
    this.environment = environment;
  }

  value_for(key) {
    return Config[key];
  }
}
