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

export default class Registry {
  constructor() {
    this.registrations = {};
  }

  register(key, factory) {
    if (this.registrations[key] == undefined) {
      this.registrations[key] = [];
    }
    let registration = new Registration(key, factory);
    this.registrations[key].push(registration);
    return registration;
  }

  resolve(key) {
    return this.registrations[key][0].create(this);
  }

  resolveAll(key) {
    return this.registrations[key].map(registration => registration.create(this));
  }
}
