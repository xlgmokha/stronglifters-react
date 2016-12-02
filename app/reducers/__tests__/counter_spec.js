import counter from '../counter';

describe('counter', () => {
  let subject = counter;

  it('increments the counter', () => {
    result = subject(undefined, {type: 'INCREMENT'})
    expect(result.count).toBe(1);
  });

  it("decrements the counter", () => {
    result = subject(undefined, {type: 'DECREMENT'})
    expect(result.count).toBe(-1);
  });
});
