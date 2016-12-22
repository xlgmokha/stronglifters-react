import Registry from '../registry';

describe("Registry", () => {
  class Item { }
  class Dependent {
    constructor(item) {
      this.item = item;
    }
  }
  class VeryDependent {
    constructor(item, dependent) {
      this.item = item;
      this.dependent = dependent;
    }
  }

  let subject = null;

  beforeEach(() => {
    subject = new Registry();
  });

  describe("#resolve", () => {
    it("resolves an instance", () => {
      subject.register('item', () => { return new Item() })

      expect(subject.resolve('item')).toBeInstanceOf(Item);
    });

    it ("resolves an instance with a dependency", function() {
      subject.register('item', () => { return new Item() });
      subject.register('dependent', (container) => {
        return new Dependent(container.resolve('item'));
      });

      let result = subject.resolve('dependent');
      expect(result).toBeInstanceOf(Dependent);
      expect(result.item).toBeInstanceOf(Item);
    });

    it ("resolves a singleton", () => {
      subject.register('item', () => { return new Item() }).asSingleton();

      let result = subject.resolve('item')
      expect(result).toBe(subject.resolve('item'));
    });

    it ("resolves the constructor dependencies", () => {
      var item = new Item();
      subject.register('item', () => item);
      subject.register('dependent', Dependent);
      subject.register('veryDependent', VeryDependent);

      let result = subject.resolve('veryDependent');
      expect(result).toBeInstanceOf(VeryDependent);
      expect(result.dependent).toBeInstanceOf(Dependent);
      expect(result.item).toEqual(item);
    })

    it ("resolves constructor dependencies for a singleton", function() {
      var item = new Item();
      subject.register('item', () => item);
      subject.register('dependent', Dependent).asSingleton();

      let result = subject.resolve('dependent');
      let other = subject.resolve('dependent');

      expect(result).toBe(other);
    });

    it ("resolves a constructor with zero dependencies", function() {
      subject.register('item', Item);

      expect(subject.resolve('item')).toBeInstanceOf(Item);
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
