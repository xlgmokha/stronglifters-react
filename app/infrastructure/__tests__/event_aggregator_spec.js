import EventAggregator from '../event-aggregator';

describe("EventAggregator", () => {
  let subject = null;

  beforeEach(() => {
    subject = new EventAggregator();
  });

  describe("publish", () => {
    class TestSubscriber {
      notify(event) {
        this.called = true;
        this.calledWith = event;
      }
    }

    it ("publishes the event to all interested subscribers", () => {
      let subscriber = new TestSubscriber();
      subject.subscribe('LOGGED_IN', subscriber);
      subject.publish({ event: 'LOGGED_IN', username: 'blah' })

      expect(subscriber.called).toBeTruthy();
      expect(subscriber.calledWith.username).toEqual('blah');
    });

    it ("does not publish events to subscribers interested in other events", function() {
      let subscriber = new TestSubscriber();
      subject.subscribe('LOGGED_IN', subscriber);
      subject.publish({ event: 'LOGGED_OUT' })

      expect(subscriber.called).toBeFalsy();
      expect(subscriber.calledWith).toBeUndefined();
    });
  });
});
