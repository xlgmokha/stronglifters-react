import Api from '../infrastructure/api';

export default class FetchWorkouts {
  constructor(eventAggregator, api = new Api('/workouts')) {
    this.eventAggregator = eventAggregator;
    this.api = api;
  }

  notify(event) {
    this.api.get(this.onResponse.bind(this));
  }

  onResponse(json) {
    this.eventAggregator.publish({
      event: 'FETCHED_WORKOUTS',
      workouts: json.workouts
    });
  }
}
