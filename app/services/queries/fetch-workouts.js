import * as events from '../events';

export default class FetchWorkouts {
  constructor(eventAggregator, api) {
    this.eventAggregator = eventAggregator;
    this.api = api;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.FETCH_WORKOUTS, this);
  }

  notify(event) {
    this.api.get('/workouts', this.onResponse.bind(this));
  }

  onResponse(json) {
    this.eventAggregator.publish({
      event: events.FETCHED_WORKOUTS,
      workouts: json.workouts || []
    });
  }
}
