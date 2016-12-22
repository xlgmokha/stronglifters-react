import ApplicationStorage from '../../infrastructure/application-storage';

export default class LogoutCommand {
  constructor(eventAggregator, applicationStorage = new ApplicationStorage()) {
    this.eventAggregator = eventAggregator;
    this.applicationStorage = applicationStorage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe('LOGOUT', this);
  }

  notify(event) {
    this.applicationStorage.delete('authentication_token');
  }
}
