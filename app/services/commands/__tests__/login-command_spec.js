import LoginCommand from '../login-command';

describe("LoginCommand", () => {
  let subject = null;
  let eventAggregator = null;
  let api = null;
  let storage = null;

  beforeEach(() => {
    api = { post: jest.fn() };
    eventAggregator = { publish: jest.fn() };
    storage = { save: jest.fn() };
    subject = new LoginCommand(eventAggregator, api, storage);
  });

  describe("#notify", () => {
    it("posts data to the api", () => {
      subject.notify({event: 'LOGIN', username: 'mokha', password: 'password'});
      expect(api.post).toHaveBeenCalled();
    });
  });

  describe("#onResponse", () => {
    let username = 'mokha';
    let token = 'token';

    it("publishes an event", () => {
      subject.onResponse({
        username: username,
        authentication_token: token,
      });

      expect(eventAggregator.publish).toHaveBeenCalledWith({
        event: 'LOGGED_IN',
        username: username,
        authentication_token: token,
      });
    });
  });
});
