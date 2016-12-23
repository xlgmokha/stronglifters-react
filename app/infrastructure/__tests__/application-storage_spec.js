import ApplicationStorage from '../application-storage';

describe("ApplicationStorage", () => {
  let subject = null;

  beforeEach(() => {
    subject = new ApplicationStorage();
  });

  describe("#fetch", () => {
    it("can fetch a saved value", () => {
      const username = "mokha";
      subject.save("username", username)
      subject.fetch("username").then((result) => {
        expect(result).toEqual(username)
      });
    });
  });
});
