import * as events from '../events';

export default class LoginCommand {
  constructor(eventAggregator, api, applicationStorage) {
    this.eventAggregator = eventAggregator;
    this.api = api;
    this.applicationStorage = applicationStorage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.LOGIN, this);
  }

  notify(event) {
    let body = { username: event.username, password: event.password };
    this.api.post('/sessions', body, this.onResponse.bind(this));
  }

  onResponse(json) {
    this.applicationStorage.save('authentication_token', json.authentication_token);
    this.eventAggregator.publish({
      event: events.LOGGED_IN,
      ...json
    });
  }
}
