import * as events from '../events';

export default class FetchNewWorkout {
  constructor(eventAggregator, api, configuration) {
    this.eventAggregator = eventAggregator;
    this.api = api;
    this.configuration = configuration;
  }

  subscribeTo(eventAggregator) {
    eventAggregator.subscribe(events.FETCH_NEW_WORKOUT, this);
  }

  notify(event) {
    if (this.configuration.isEnabled('LOCAL_ONLY')) {
      this.onResponse(this.exampleResponse());
    } else {
      this.api.get('/workouts/new', this.onResponse.bind(this));
    }
  }

  onResponse(json) {
    this.eventAggregator.publish({
      event: events.FETCHED_NEW_WORKOUT,
      ...json
    });
  }

  exampleResponse() {
    return {
      "body_weight":{"amount":237.0,"unit":"lbs"},
      "routine":{"id":"493263ce-6b60-456f-8645-f2c3f0e0f820","name":"B"},
      "exercises":[
        {"id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","name":"Squat"},
        {"id":"98900216-dc06-474b-9f65-d72509aab218","name":"Overhead Press"},
        {"id":"046bfecd-549a-43c3-b9c2-32459936fce7","name":"Deadlift"},
        {"id":"91abf59a-1a4b-4d2f-9d3f-4434bf3068a3","name":"Chinups"},
        {"id":"60278cc7-3d96-44a0-87af-c0df91064145","name":"Pull Ups"},
        {"id":"4a5f6c3e-d659-4845-b3c4-3f6210a9464f","name":"Close Grip Bench Press"}
      ],
      "sets":[
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":95.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":135.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":185.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":225.0,"unit":"lbs"},"target_repetitions":3,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":265.0,"unit":"lbs"},"target_repetitions":2,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":305.0,"unit":"lbs"},"target_repetitions":1,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WorkSet","target_weight":{"amount":335.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WorkSet","target_weight":{"amount":335.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WorkSet","target_weight":{"amount":335.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WarmUpSet","target_weight":{"amount":75.0,"unit":"lbs"},"target_repetitions":3,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WorkSet","target_weight":{"amount":110.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WorkSet","target_weight":{"amount":110.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WorkSet","target_weight":{"amount":110.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":135.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":185.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":225.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":265.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WorkSet","target_weight":{"amount":290.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"91abf59a-1a4b-4d2f-9d3f-4434bf3068a3","type":"WorkSet","target_weight":{"amount":0.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"91abf59a-1a4b-4d2f-9d3f-4434bf3068a3","type":"WorkSet","target_weight":{"amount":0.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"91abf59a-1a4b-4d2f-9d3f-4434bf3068a3","type":"WorkSet","target_weight":{"amount":0.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"60278cc7-3d96-44a0-87af-c0df91064145","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"60278cc7-3d96-44a0-87af-c0df91064145","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"60278cc7-3d96-44a0-87af-c0df91064145","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"4a5f6c3e-d659-4845-b3c4-3f6210a9464f","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"4a5f6c3e-d659-4845-b3c4-3f6210a9464f","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":null,"exercise_id":"4a5f6c3e-d659-4845-b3c4-3f6210a9464f","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null}
      ]
    };
  }
}
