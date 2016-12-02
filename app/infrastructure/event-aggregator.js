
export default class EventAggregator {
  constructor() {
    this.subscriptions = { };
  }

  subscribe(event, subscriber) {
    this.subscriptionsFor(event).push(subscriber);
  }

  publish(event) {
    this.subscriptionsFor(event.event).forEach(x => x.notify(event));
  }

  subscriptionsFor(event) {
    if (this.subscriptions.hasOwnProperty(event) == false) {
      this.subscriptions[event] = [];
    }
    return this.subscriptions[event];
  }
}
