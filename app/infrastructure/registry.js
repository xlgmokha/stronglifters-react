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
    let code = func.toString();
    let regex = /function ([a-zA-Z]*)\((.*)\) *\{/;
    return code.match(regex);
  }

  isConstructor() {
    return this.parseConstructor(this.factory)[1] != '';
  }

  resolveDependenciesUsing(container) {
    let ctor = this.parseConstructor(this.factory);
    let parameters = ctor.slice(2)[0].split(',').filter(Boolean);
    let dependencies = parameters.map((parameter) => {
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
    let originalFactory = this.factory;
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
    this.registrations = {};
  }

  register(key, factory) {
    if (this.registrations[key] == undefined) {
      this.registrations[key] = [];
    }
    let registration = new Registration(factory);
    this.registrations[key].push(registration);
    return registration;
  }

  isRegistered(key) {
    return this.registrations.hasOwnProperty(key);
  }

  resolve(key) {
    if (!this.isRegistered(key)) {
      throw `"${key}" is not registered`;
    }

    try {
      let registration = this.registrations[key][0];
      return registration.create(this);
    } catch(error) {
      console.error(`ERROR: Could not resolve "${key}" ${error}`);
      throw error;
    }
  }

  resolveAll(key) {
    return this.registrations[key].map(registration => registration.create(this));
  }
}
