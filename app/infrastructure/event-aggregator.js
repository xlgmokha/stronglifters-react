export default class EventAggregator {
  constructor() {
    this.subscriptions = { };
  }

  subscribe(event, subscriber) {
    this._subscriptionsFor(event).push(subscriber);
  }

  publish(event) {
    this._subscriptionsFor(event.event).forEach(x => x.notify(event));
  }

  unsubscribe(subscriber) {
    for (var event in this.subscriptions) {
      let items = this._subscriptionsFor(event)
      items.splice(items.indexOf(subscriber));
    }
  }

  _subscriptionsFor(event) {
    let key = event;
    if (!this.subscriptions.hasOwnProperty(key)) {
      this.subscriptions[key] = [];
    }
    return this.subscriptions[key];
  }
}
