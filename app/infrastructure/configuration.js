import Config from 'react-native-config';

var _configuration = {
  development: {
    API_HOST: 'http://localhost:3000'
  },
  production: {
    API_HOST: 'https://www.stronglifters.com'
  }
};

export default class Configuration {
  constructor(environment) {
    this.environment = environment;
  }

  value_for(key) {
    //return Config[key];
    return _configuration[this.environment][key];
  }
}
