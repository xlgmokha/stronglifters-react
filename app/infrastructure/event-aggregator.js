export default class EventAggregator {
  constructor() {
    this.subscriptions = { };
  }

  subscribe(event, subscriber) {
    this._subscriptionsFor(event).add(subscriber);
  }

  publish(event) {
    this._subscriptionsFor(event.event).forEach((x) => {
      x.notify(event);
    });
  }

  unsubscribe(subscriber) {
    for (var subscription in this.subscriptions) {
      let subscribers = this._subscriptionsFor(subscription)
      if (subscribers.has(subscriber)) {
        subscribers.delete(subscriber);
      }
    }
  }

  _subscriptionsFor(event) {
    let key = event;
    if (!this.subscriptions.hasOwnProperty(key)) {
      this.subscriptions[key] = new Set();
    }
    return this.subscriptions[key];
  }
}
