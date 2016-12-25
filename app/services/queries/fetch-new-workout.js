import * as events from '../events';

export default class FetchNewWorkout {
  constructor(eventAggregator, api) {
    this.eventAggregator = eventAggregator;
    this.api = api;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.FETCH_NEW_WORKOUT, this);
  }

  notify(event) {
    this.api.get('/workouts/new', this.onResponse.bind(this));
  }

  onResponse(json) {
    this.eventAggregator.publish({
      event: events.FETCHED_NEW_WORKOUT,
      ...json
    });
  }
}
