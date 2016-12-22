import Api from '../../infrastructure/api';
import ApplicationStorage from '../../infrastructure/application-storage';
import * as events from '../events';

export default class LoginCommand {
  constructor(eventAggregator, api = new Api('/sessions'), storage = new ApplicationStorage()) {
    this.eventAggregator = eventAggregator;
    this.api = api;
    this.storage = storage;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.LOGIN, this);
  }

  notify(event) {
    let body = { username: event.username, password: event.password };
    this.api.post(body, this.onResponse.bind(this));
  }

  onResponse(json) {
    this.storage.save('authentication_token', json.authentication_token);
    this.eventAggregator.publish({
      event: events.LOGGED_IN,
      ...json
    });
  }
}