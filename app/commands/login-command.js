import Api from '../infrastructure/api';

export default class LoginCommand {
  constructor(eventAggregator, api = new Api('/sessions')) {
    this.eventAggregator = eventAggregator;
    this.api = api;
  }

  notify(event) {
    let body = { username: event.username, password: event.password };
    this.api.post(body, this.onResponse.bind(this));
  }

  onResponse(json) {
    this.eventAggregator.publish({
      event: 'LOGGED_IN',
      username: json.username,
      authentication_token: json.authentication_token,
    });
  }
}
