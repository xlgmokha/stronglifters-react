class Registration {
  constructor(key, factory) {
    this.key = key;
    this.factory = factory;
  }

  create(container) {
    return this.factory(container);
  }

  asSingleton() {
    let originalFactory = this.factory;
    let item = null;
    this.factory = (container) => {
      if (item == null) {
        item = originalFactory(container);
      }
      return item;
    };
  }
}

export default class Container {
  constructor() {
    this.components = {};
  }

  register(key, factory) {
    return this.components[key] = new Registration(key, factory)
  }

  resolve(key) {
    return this.components[key].create(this);
  }
}
