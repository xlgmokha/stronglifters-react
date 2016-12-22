export default class EventAggregator {
  constructor() {
    this.subscriptions = { };
  }

  subscribe(event, subscriber) {
    this._subscriptionsFor(event).add(subscriber);
  }

  publish(event) {
    console.log("publishing:");
    console.dir(event);
    this._subscriptionsFor(event.event).forEach((x) => {
      console.dir(x);
      x.notify(event);
    });
  }

  unsubscribe(subscriber) {
    for (var event in this.subscriptions) {
      let items = this._subscriptionsFor(event)
      if (items.has(subscriber)) {
        items.delete(subscriber);
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
