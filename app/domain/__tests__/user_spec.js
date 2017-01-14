class User {
  constructor(bodyWeight: 0) {
    this.bodyWeight = bodyWeight;
  }

  switchTo(program) { }

  nextWorkoutFor(routine) {
    return new Workout(this.bodyWeight);
  }
}

class StrongliftsProgram {
  routine(name) {
  }
}

class Workout {
  constructor(bodyWeight = 0) {
    this.bodyWeight = bodyWeight;
  }
}

describe("User", () => {
  it ("creates the next workout", function() {
    const program = new StrongliftsProgram();
    const user = new User(240);
    const routineA = program.routine("A")

    user.switchTo(program)
    const workout = user.nextWorkoutFor(routineA);

    expect(workout.bodyWeight).toEqual(240);
  });
});
