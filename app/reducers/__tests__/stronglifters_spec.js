import stronglifters from '../stronglifters';

describe('stronglifters', () => {
  let subject = stronglifters;

  describe("LOGGED_IN", () => {
    let username = 'mokha';
    let authentication_token = 'token';
    let result = null;

    beforeEach(() => {
      event = { type: 'LOGGED_IN', username, authentication_token };
      result = subject(undefined, event);
    });

    it("returns the username", () => {
      expect(result.authentication_token).toEqual(authentication_token)
    });


    it ("returns the authentication token", function() {
      expect(result.username).toEqual(username)
    });
  });
});
