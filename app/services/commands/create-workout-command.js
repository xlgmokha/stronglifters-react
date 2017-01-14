import * as events from '../events';
import ApplicationCommand from './application-command';

export default class CreateWorkoutCommand extends ApplicationCommand {
  constructor(eventAggregator, api) {
    super();
    this.eventAggregator = eventAggregator;
    this.api = api;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.CREATE_WORKOUT, this);
  }

  run(event) {
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
    this.eventAggregator.publish({
      event: events.CREATED_WORKOUT,
      ...json
    });
  }
}
