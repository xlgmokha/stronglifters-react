import EventAggregator from '../infrastructure/event-aggregator';
import FetchWorkouts from '../queries/fetch-workouts';
import LoginCommand from '../commands/login-command';
import Registry from '../infrastructure/registry';
import Router from '../infrastructure/router'

export default class WireUpComponentsInto {
  constructor(registry = new Registry()) {
    this.registry = registry;
  }

  run() {
    registry.registry('eventAggregator', (container) => {
      return new EventAggregator();
    }).asSingleton();

    registry.register('router', (container) => {
      return new Router({
        eventAggregator: container.resolve('eventAggregator')
      });
    }).asSingleton();
    registerCommandsInto(this.registry);
    registerQueriesInto(this.registry);
    return this.registry;
  }

  registerCommandsInto(registry) {
    registry.registry('command', (container) => {
      //eventAggregator.subscribe("LOGIN", command);
      return new LoginCommand(container.resolve('eventAggregator'));
    }).asSingleton();

    // register each command with the event aggregator
  }

  registerQueriesInto(registry) {
    registry.registry('query', (container) => {
      //eventAggregator.subscribe("FETCH_WORKOUTS", query);
      return new FetchWorkouts(container.resolve('eventAggregator'));
    }).asSingleton();
  }
}
