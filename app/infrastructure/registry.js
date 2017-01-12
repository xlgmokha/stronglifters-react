export class Resolver {
  constructor(factory) {
    this.factory = factory;
  }

  resolveWith(container) {
    if (this.isConstructor()) {
      return this.resolveDependenciesUsing(container);
    }
    else {
      return this.factory(container);
    }
  }

  parseConstructor(func) {
    const code = func.toString();
    const regex = /function ([a-zA-Z]*)\((.*)\) *\{/;
    return code.match(regex);
  }

  isConstructor() {
    return this.factory.name;
    //return this.parseConstructor(this.factory)[1] != '';
  }

  resolveDependenciesUsing(container) {
    const ctor = this.parseConstructor(this.factory);
    const parameters = ctor.slice(2)[0].split(',').filter(Boolean);
    const dependencies = parameters.map((parameter) => {
      return container.resolve(parameter.trim());
    });
    return new this.factory(...dependencies);
  }
}

export class Registration {
  constructor(factory) {
    this.factory = factory;
  }

  create(container) {
    return new Resolver(this.factory).resolveWith(container);
  }

  asSingleton() {
    const originalFactory = this.factory;
    let item = null;
    this.factory = (container) => {
      if (item == null) {
        item = new Resolver(originalFactory).resolveWith(container);
      }
      return item;
    };
  }
}

export default class Registry {
  constructor() {
    this.registrations = new Map();
  }

  register(key, factory) {
    if (!this.isRegistered(key)) {
      this.registrations.set(key, new Set());
    }
    const registration = new Registration(factory);
    this.registrations.get(key).add(registration);
    return registration;
  }

  isRegistered(key) {
    return this.registrations.has(key);
  }

  resolve(key) {
    if (!this.isRegistered(key)) {
      throw `"${key}" is not registered`;
    }

    try {
      const registration = this._registrationsFor(key)[0];
      return registration.create(this);
    } catch(error) {
      console.error(`ERROR: Could not resolve "${key}" ${error}`);
      throw error;
    }
  }

  resolveAll(key) {
    return this._registrationsFor(key).map(registration => registration.create(this));
  }

  _registrationsFor(key) {
    return Array.from(this.registrations.get(key));
  }
}
