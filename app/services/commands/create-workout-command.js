import * as events from '../events';

export default class CreateWorkoutCommand {
  constructor(eventAggregator, api) {
    this.eventAggregator = eventAggregator;
    this.api = api;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.CREATE_WORKOUT, this);
  }

  notify(event) {
    const body = {
      workout: {
        body_weight: event.body_weight,
        exercise_sets_attributes: event.sets,
        routine_id: event.routine_id,
      }
    };
    this.api.post('/workouts', body, this.onResponse.bind(this));
  }

  onResponse(json) {
    console.log("CREATED");
    console.log(json);
  }
}
