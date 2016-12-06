import Registry from '../registry';

describe("Registry", () => {
  let subject = null;

  beforeEach(() => {
    subject = new Registry();
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

      let result = subject.resolve('dependent');
      expect(result).toBeInstanceOf(Dependent);
      expect(result.item).toBeInstanceOf(Item);
    });

    it ("can resolve a singleton", () => {
      subject.register('item', () => { return new Item() }).asSingleton();

      let result = subject.resolve('item')
      expect(result).toBe(subject.resolve('item'));
    });
  });

  describe("#resolveAll", () => {
    beforeEach(() => {
      subject.register('item', () => { return "0"; });
      subject.register('item', () => { return "1"; });
    });

    it ("resolves all instances of the given key", () => {
      let results = subject.resolveAll('item');
      expect(results.length).toEqual(2);
      expect(results[0]).toEqual("0");
      expect(results[1]).toEqual("1");
    });
  });
});
