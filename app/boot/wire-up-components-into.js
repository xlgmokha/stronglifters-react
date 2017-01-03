import * as commands from '../services/commands';
import * as queries from '../services/queries';
import Api from '../infrastructure/api';
import ApplicationStorage from '../infrastructure/application-storage';
import Configuration from '../infrastructure/configuration';
import EventAggregator from '../infrastructure/event-aggregator';
import Registry from '../infrastructure/registry';
import Router from '../infrastructure/router'

export default class WireUpComponentsInto {
  constructor(registry = new Registry()) {
    this.registry = registry;
  }

  run() {
    this.registry.register('eventAggregator', EventAggregator).asSingleton();
    this.registry.register('router', (container) => {
      return new Router({
        eventAggregator: container.resolve('eventAggregator'),
        registry: this.registry
      });
    }).asSingleton();
    this.registry.register('applicationStorage', ApplicationStorage).asSingleton();
    this.registry.register('configuration', Configuration).asSingleton();
    this.registry.register('api', Api).asSingleton();

    this.registerSubscribers(commands);
    this.registerSubscribers(queries);

    this.registry.resolveAll("subscriber").forEach((subscriber) => {
      subscriber.subscribeTo(this.registry.resolve('eventAggregator'));
    });
    return this.registry;
  }

  registerSubscribers(subscribers) {
    for (let subscriber in subscribers) {
      this.registry.register('subscriber', subscribers[subscriber]).asSingleton();
    }
  }
}
