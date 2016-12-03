import LoginCommand from '../login-command';

describe("LoginCommand", () => {
  let subject = null;

  beforeEach(() => {
    subject = new LoginCommand();
  });

  describe("#notify", () => {
    it ("does something", () => {
      subject.notify({
        event: 'LOGIN',
      });
    });
  });
});
