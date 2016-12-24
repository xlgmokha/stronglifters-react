import Configuration from '../configuration';

describe("Configuration", ()=> {
  let subject = null;

  describe("development", () => {
    beforeEach(()=> {
      subject = new Configuration('development');
    });

    it ("loads the api host", function() {
      expect(
        subject.value_for("API_HOST")
      ).toEqual('http://localhost:3000')
    });
  });

  describe("production", () => {
    beforeEach(()=> {
      subject = new Configuration('production');
    });

    it ("loads the api host", function() {
      expect(
        subject.value_for("API_HOST")
      ).toEqual('https://www.stronglifters.com')
    });
  });
});
