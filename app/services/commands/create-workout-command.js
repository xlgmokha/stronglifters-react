import * as events from '../events';
import ApplicationCommand from './application-command';

export default class CreateWorkoutCommand extends ApplicationCommand {
  constructor(eventAggregator, api, configuration) {
    super();
    this.eventAggregator = eventAggregator;
    this.api = api;
    this.configuration = configuration;
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
    if (this.configuration.isEnabled('LOCAL_ONLY')) {
      this.onResponse(this.exampleResponse());
    } else {
      this.api.post('/workouts', body, this.onResponse.bind(this));
    }
  }

  onResponse(json) {
    this.eventAggregator.publish({
      event: events.CREATED_WORKOUT,
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
        {"id":"1FAAC0A7-6226-4FF9-A667-D6ED9A80386E","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"835266B8-814D-4AB3-872E-07905AC5D3E1","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"3F536888-2775-428D-B1D8-F795B659D66B","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":95.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"0827B1ED-EA2F-47AB-AB2D-E389ACA6552E","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":135.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"505FDAD5-065B-4107-87EE-A3414D4D2B17","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":185.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"EDDF2250-E722-4AAC-A99A-FAEE4837A643","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":225.0,"unit":"lbs"},"target_repetitions":3,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"55F92200-4C2A-4D35-9F46-A7FE876609F2","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":265.0,"unit":"lbs"},"target_repetitions":2,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"2DF1682D-2F54-435E-B394-3EA157425814","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WarmUpSet","target_weight":{"amount":305.0,"unit":"lbs"},"target_repetitions":1,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"9C0D6B8C-8D25-4753-A1DE-1EE7F44BE1AF","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WorkSet","target_weight":{"amount":335.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"D6351B67-4C08-4201-822E-DC55C14F6B2F","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WorkSet","target_weight":{"amount":335.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"43A14019-2E23-4B63-8B93-BEB10441F6B5","exercise_id":"7d91de12-60f6-4a04-9ed4-a9bbeb05681b","type":"WorkSet","target_weight":{"amount":335.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"4E505112-098D-4171-A13B-54396EC40068","exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"F520C8C7-5B08-4B53-89BD-75268DEB6461","exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WarmUpSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"C1ADC8B6-4656-433A-AE6A-B9121256CF13","exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WarmUpSet","target_weight":{"amount":75.0,"unit":"lbs"},"target_repetitions":3,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"DD049CFC-1F38-4D3D-8965-3D19FE72791A","exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WorkSet","target_weight":{"amount":110.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"B01403E2-E611-49E2-B3E0-BC72998357C9","exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WorkSet","target_weight":{"amount":110.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"4C8A1B36-F95C-40A5-BD69-EB285D5B3596","exercise_id":"98900216-dc06-474b-9f65-d72509aab218","type":"WorkSet","target_weight":{"amount":110.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"6F08B067-49A2-4C3C-8E52-270C155968CF","exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":135.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"4CC94C2E-118C-450A-814B-4356CD7E8444","exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":185.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"F494E849-2CBD-4BE3-A1F7-0753DB965A81","exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":225.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"9D48F62E-150A-4D90-AE7A-27302BDC3C31","exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WarmUpSet","target_weight":{"amount":265.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"1AD93E05-FE8F-447B-9920-EC959E1DBA84","exercise_id":"046bfecd-549a-43c3-b9c2-32459936fce7","type":"WorkSet","target_weight":{"amount":290.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"961B0D3F-B8A5-4E39-887B-59AC5E10D168","exercise_id":"91abf59a-1a4b-4d2f-9d3f-4434bf3068a3","type":"WorkSet","target_weight":{"amount":0.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"3014CFEE-D23A-4DCD-886F-99B076A4F696","exercise_id":"91abf59a-1a4b-4d2f-9d3f-4434bf3068a3","type":"WorkSet","target_weight":{"amount":0.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"0FB11A4B-8A73-47D5-9CF4-0EDFBB223278","exercise_id":"91abf59a-1a4b-4d2f-9d3f-4434bf3068a3","type":"WorkSet","target_weight":{"amount":0.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"31C8D82E-D9AE-453F-A865-D554FF73A0DE","exercise_id":"60278cc7-3d96-44a0-87af-c0df91064145","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"DA41E9A1-8C56-45A1-A268-71763E3E1BF1","exercise_id":"60278cc7-3d96-44a0-87af-c0df91064145","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"5EAFA820-F129-4546-A2A4-A0E1FB5EAEBC","exercise_id":"60278cc7-3d96-44a0-87af-c0df91064145","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"33C776DA-4F78-4884-A5B6-EF6D5BCEDE91","exercise_id":"4a5f6c3e-d659-4845-b3c4-3f6210a9464f","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"F152DD0D-84C2-4F01-8458-B9FAEA875C8F","exercise_id":"4a5f6c3e-d659-4845-b3c4-3f6210a9464f","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null},
        {"id":"7495AB75-B88C-4E9F-8433-58216806EC39","exercise_id":"4a5f6c3e-d659-4845-b3c4-3f6210a9464f","type":"WorkSet","target_weight":{"amount":45.0,"unit":"lbs"},"target_repetitions":5,"actual_repetitions":null,"actual_duration":null,"target_duration":null}
      ]
    };
  }
}
