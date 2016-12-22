import * as events from '../events';

export default class LoginCommand {
  constructor(eventAggregator, sessionsApi, applicationStorage) {
    this.eventAggregator = eventAggregator;
    this.api = sessionsApi;
    this.applicationStorage = applicationStorage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.LOGIN, this);
  }

  notify(event) {
    let body = { username: event.username, password: event.password };
    this.api.post(body, this.onResponse.bind(this));
  }

  onResponse(json) {
    this.applicationStorage.save('authentication_token', json.authentication_token);
    this.eventAggregator.publish({
      event: events.LOGGED_IN,
      ...json
    });
  }
}
