export default class Container {
  constructor() {
    this.components = {};
  }

  register(key, factory) {
    this.components[key] = factory;
  }

  resolve(key) {
    return this.components[key](this);
  }
}
