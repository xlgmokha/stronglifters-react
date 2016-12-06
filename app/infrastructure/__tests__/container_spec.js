import Container from '../container';

describe("Container", () => {
  let subject = null;

  beforeEach(() => {
    subject = new Container();
  });

  describe("#resolve", () => {
    class Item { }
    class Dependent {
      constructor(item) {
        this.item = item;
      }
    }

    it("can resolve an instance", () => {
      subject.register('item', () => { return new Item() })

      expect(subject.resolve('item')).toBeInstanceOf(Item);
    });

    it ("can resolve an instance with a dependency", function() {
      subject.register('item', () => { return new Item() });
      subject.register('dependent', (container) => {
        return new Dependent(container.resolve('item'));
      });

      result = subject.resolve('dependent');
      expect(result).toBeInstanceOf(Dependent);
      expect(result.item).toBeInstanceOf(Item);
    });

    it ("can resolve a singleton", () => {
      subject.register('item', () => { return new Item() }).asSingleton();

      result = subject.resolve('item')
      expect(result).toBe(subject.resolve('item'));
    });
  });
});
