var _defaults = {
  API_HOST: 'https://www.stronglifters.com',
  ENV: 'production'
};

export default class Configuration {
  constructor(overrides = _defaults) {
    this.overrides = overrides;
  }

  value_for(key) {
    return process.env[key] || this.overrides[key];
  }
}
