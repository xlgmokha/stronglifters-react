import Configuration from '../configuration';

describe("Configuration", ()=> {
  let subject = null;

  beforeEach(() => {
    subject = new Configuration();
  });

  it ("loads the api host", function() {
    expect(subject.value_for("API_HOST")).toEqual('https://www.stronglifters.com')
  });
});
