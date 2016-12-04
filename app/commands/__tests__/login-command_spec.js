import LoginCommand from '../login-command';

describe("LoginCommand", () => {
  let subject = null;
  let eventAggregator = null;
  let api = null;

  beforeEach(() => {
    api = { post: jest.fn() };
    eventAggregator = { publish: jest.fn() };
    subject = new LoginCommand(eventAggregator, api);
  });

  describe("#notify", () => {
    it ("does something", () => {
      const func = jest.fn();
      func();
      expect(func).toHaveBeenCalled();
    });

    it("posts data to the api", () => {
      subject.notify({event: 'LOGIN', username: 'mokha', password: 'password'});
      expect(api.post).toHaveBeenCalled();
    });
  });

  describe("#onResponse", () => {
    it("publishes an event", () => {
      username = 'mokha';
      token = 'token';

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
