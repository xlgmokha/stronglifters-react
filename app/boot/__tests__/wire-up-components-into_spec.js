import WireUpComponentsInto from '../wire-up-components-into';
import Registry from '../../infrastructure/registry';
import * as commands from '../../services/commands';

describe("WireUpComponentsInto", () => {
  let subject = null;
  let registry = null;

  beforeEach(() => {
    registry = new Registry();
    subject = new WireUpComponentsInto(registry);
  });

  describe("#run", () => {
    it ("registers each command", function() {
      subject.run()

      results = registry.resolveAll('subscriber')
      expect(results.length).toEqual(3)
    });
  });
})
