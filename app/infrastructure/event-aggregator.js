
export default class EventAggregator {
  constructor() {
    this.subscribers = [];
  }

  subscribe(event, subscriber) {
    this.subscribers.push(subscriber);
  }

  publish(event) {
    this.subscribers.forEach(x => x.notify(event));
  }
}
