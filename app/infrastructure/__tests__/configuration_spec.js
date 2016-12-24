import Configuration from '../configuration';

describe("Configuration", ()=> {
  let subject = null;

  beforeEach(()=> {
    subject = new Configuration('development');
  });

  it ("loads the specified configuration", function() {
    let apiHost='http://192.168.128.6:3000'

    expect(subject.value_for("API_HOST")).toEqual(apiHost)
  });
});
