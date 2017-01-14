import Repository from '../repository';

describe("Repository", () => {
  let subject = null;
  const type = 'Account'

  beforeEach(() => {
    subject = new Repository();
  });

  afterEach(() => {
    subject.deleteAll(type);
  });

  it ("can save an account", () => {
    subject.save(type, {
      authentication_token: 'secret'
    })

    expect(subject.count(type)).toEqual(1);
    expect(subject.all(type)[0]['authentication_token']).toEqual('secret');
  });
});
