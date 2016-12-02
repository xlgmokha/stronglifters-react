
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
    let key = event;
    if (!this.subscriptions.hasOwnProperty(key)) {
      this.subscriptions[key] = [];
    }
    return this.subscriptions[key];
  }
}
