import * as events from '../events';

export default class LogoutCommand {
  constructor(eventAggregator, applicationStorage) {
    this.eventAggregator = eventAggregator;
    this.applicationStorage = applicationStorage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.LOGOUT, this);
  }

  notify(event) {
    this.applicationStorage.delete('authentication_token');
  }
}
