import * as commands from '../services/commands';
import * as queries from '../services/queries';
import Api from '../infrastructure/api';
import ApplicationStorage from '../infrastructure/application-storage';
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
        eventAggregator: container.resolve('eventAggregator')
      });
    }).asSingleton();
    this.registry.register('applicationStorage', ApplicationStorage).asSingleton();
    this.registry.register('sessionsApi', (container) => new Api('/sessions', container.resolve('applicationStorage'))).asSingleton();
    this.registry.register('workoutsApi', (container) => new Api('/workouts', container.resolve('applicationStorage'))).asSingleton();
    this.registerSubscribers(commands);
    this.registerSubscribers(queries);
    return this.registry;
  }

  registerSubscribers(subscribers) {
    for (let subscriber in subscribers) {
      //console.log(`registering: ${subscriber}`);
      this.registry.register('subscriber', subscribers[subscriber]).asSingleton();
    }
    this.registry.resolveAll("subscriber").forEach((subscriber) => {
      subscriber.subscribeTo(this.registry.resolve('eventAggregator'));
    });
  }
}
