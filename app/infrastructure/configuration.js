var _defaults = {
  API_HOST: 'http://192.168.128.6:3000',
  ENV: 'production'
};

export default class Configuration {
  value_for(key) {
    return process.env[key] || _defaults[key];
  }
}
