import * as commands from '../../services/commands';
import Api from '../../infrastructure/api';
import Registry from '../../infrastructure/registry';
import WireUpComponentsInto from '../wire-up-components-into';

describe("WireUpComponentsInto", () => {
  let subject = null;
  let registry = null;

  beforeEach(() => {
    registry = new Registry();
    subject = new WireUpComponentsInto(registry);
  });

  describe("#run", () => {
    beforeEach(() => {
      subject.run()
    });

    it ("registers each command", function() {
      results = registry.resolveAll('subscriber');
      expect(results.length).toEqual(5);
    });

    it ("can build the api", function() {
      result = registry.resolve('api');
      expect(result).toBeInstanceOf(Api);
    });
  });
})
