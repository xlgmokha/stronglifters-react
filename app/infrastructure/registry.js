export class Registration {
  constructor(key, factory) {
    this.key = key;
    this.factory = factory;
  }

  create(container) {
    if (this.isConstructor()) {
      return this.resolveDependenciesUsing(container);
    }
    else {
      return this.factory(container);
    }
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

  parseConstructor(item) {
    let code = item.toString();
    let regex = /function ([a-zA-Z]*)\((.*)\)\{/;
    return code.match(regex);
  }

  isConstructor() {
    return this.parseConstructor(this.factory)[1] != '';
  }

  resolveDependenciesUsing(container) {
    let parameters = this.parseConstructor(this.factory).slice(2);
    let dependencies = parameters.map((parameter) => container.resolve(parameter));
    return new this.factory(...dependencies);
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

  build(key) {
    return this.registrations[key][0].create(this);
  }
}
