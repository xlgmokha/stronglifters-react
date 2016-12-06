import EventAggregator from '../infrastructure/event-aggregator';
import Registry from '../infrastructure/registry';
import Router from '../infrastructure/router'
import * as commands from '../commands';
import * as queries from '../queries';

export default class WireUpComponentsInto {
  constructor(registry = new Registry()) {
    this.registry = registry;
  }

  run() {
    this.registry.register('eventAggregator', (container) => {
      return new EventAggregator();
    }).asSingleton();

    this.registry.register('router', (container) => {
      return new Router({
        eventAggregator: container.resolve('eventAggregator')
      });
    }).asSingleton();
    this.registerCommandsInto(this.registry);
    this.registerQueriesInto(this.registry);
    return this.registry;
  }

  registerCommandsInto(registry) {
    for (var command in commands) {
      console.log(`registering: ${command}`);
      registry.register('command', (container) => {
        return new commands[command](container.resolve('eventAggregator'));
      }).asSingleton();
    }
    registry.resolveAll("command").forEach((command) => {
      command.subscribeTo(registry.resolve('eventAggregator'));
    });
  }

  registerQueriesInto(registry) {
    for (var query in queries) {
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
