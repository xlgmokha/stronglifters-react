import * as events from '../events';
import ApplicationCommand from './application-command';

export default class LogoutCommand extends ApplicationCommand {
  constructor(eventAggregator, applicationStorage) {
    super();
    this.eventAggregator = eventAggregator;
    this.applicationStorage = applicationStorage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.LOGOUT, this);
  }

  run(event) {
    this.applicationStorage.delete('authentication_token');
  }
}
