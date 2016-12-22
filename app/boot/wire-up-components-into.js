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
    this.registry.register('sessionsApi', () => {
      return new Api('/sessions');
    }).asSingleton();
    this.registerCommandsInto(this.registry);
    this.registerQueriesInto(this.registry);
    return this.registry;
  }

  registerCommandsInto(registry) {
    for (let command in commands) {
      console.log(`registering: ${command}`);
      registry.register('command', commands[command]).asSingleton();
    }
    registry.resolveAll("command").forEach((command) => {
      command.subscribeTo(registry.resolve('eventAggregator'));
    });
  }

  registerQueriesInto(registry) {
    for (let query in queries) {
      console.log(`registering: ${query}`);
      registry.register('query', (container) => {
        return new queries[query](container.resolve('eventAggregator'));
      }).asSingleton();
    }
    registry.resolveAll("query").forEach((query) => {
      query.subscribeTo(registry.resolve('eventAggregator'));
    });
  }
}
