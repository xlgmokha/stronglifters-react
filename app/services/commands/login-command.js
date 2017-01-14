import * as events from '../events';
import ApplicationCommand from './application-command';

export default class LoginCommand extends ApplicationCommand {
  constructor(eventAggregator, api, applicationStorage) {
    super();
    this.eventAggregator = eventAggregator;
    this.api = api;
    this.applicationStorage = applicationStorage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.LOGIN, this);
  }

  run(event) {
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
