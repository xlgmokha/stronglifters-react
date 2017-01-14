import Configuration from '../configuration';

describe("Configuration", ()=> {
  let subject = null;

  describe("without overrides", () => {
    beforeEach(() => {
      subject = new Configuration();
    });

    it ("loads the api host", () => {
      expect(subject.value_for("API_HOST")).toEqual('https://www.stronglifters.com')
    });

    it ("loads the default ENV", () => {
      expect(subject.value_for("ENV")).toEqual('production')
    });
  });

  describe("with overrides", () => {
    let overrides = null;

    beforeEach(() => {
      overrides = { ENV: 'development', API_HOST: 'http://localhost:3000' };
      subject = new Configuration(overrides);
    });

    it ("loads the override for API_HOST", () => {
      expect(subject.value_for("API_HOST")).toEqual('http://localhost:3000')
    });

    it ("loads the override for ENV", () => {
      expect(subject.value_for("ENV")).toEqual('development')
    });

    it ("merges defaults with the overrides", () => {
      overrides = { API_HOST: 'http://localhost:3000' };
      subject = new Configuration(overrides);

      expect(subject.value_for("ENV")).toEqual('production')
      expect(subject.value_for("API_HOST")).toEqual('http://localhost:3000')
    });
  });
});
