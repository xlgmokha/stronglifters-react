import Container from '../container';

describe("Container", () => {
  let subject = null;

  beforeEach(() => {
    subject = new Container();
  });

  describe("#resolve", () => {
    class Item { }

    it("can resolve an instance", () => {
      subject.register('eventAggregator', () => { return new Item() })

      expect(subject.resolve('eventAggregator')).toBeInstanceOf(Item);
    });
  });
});
