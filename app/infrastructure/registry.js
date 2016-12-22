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

  parseConstructor(item) {
    let code = item.toString();
    let regex = /function ([a-zA-Z]*)\((.*)\)\{/;
    return code.match(regex);
  }

  isConstructor() {
    return this.parseConstructor(this.factory)[1] != '';
  }

  resolveDependenciesUsing(container) {
    let parameters = this.parseConstructor(this.factory).slice(2).filter(Boolean);
    let dependencies = parameters.map((parameter) => container.resolve(parameter));
    return new this.factory(...dependencies);
  }
}

export class Registration {
  constructor(key, factory) {
    this.key = key;
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
