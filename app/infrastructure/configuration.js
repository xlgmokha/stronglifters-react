var _defaults = {
  API_HOST: 'https://www.stronglifters.com',
  ENV: 'production'
};

export default class Configuration {
  value_for(key) {
    return process.env[key] || _defaults[key];
  }
}
