import WireUpComponentsInto from '../wire-up-components-into';
import Registry from '../../infrastructure/registry';

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

      results = registry.resolveAll('command')
      expect(results.length).toEqual(1)
      expect(results[0]).toBeInstanceOf(LoginCommand);
    });
  });
})
