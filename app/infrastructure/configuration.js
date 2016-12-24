var _defaults = {
  development: {
    API_HOST: 'http://localhost:3000',
    ENV: 'development'
  },
  production: {
    API_HOST: 'https://www.stronglifters.com',
    ENV: 'production'
  }
};

export default class Configuration {
  constructor(environment) {
    this.environment = environment;
  }

  value_for(key) {
    return process.env[key] || _defaults[this.environment][key];
  }
}
