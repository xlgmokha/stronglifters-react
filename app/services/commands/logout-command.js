export default class LogoutCommand {
  constructor(applicationStorage) {
    this.applicationStorage = applicationStorage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe('LOGOUT', this);
  }

  notify(event) {
    this.applicationStorage.delete('authentication_token');
  }
}
