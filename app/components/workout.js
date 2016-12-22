import React, { Component } from 'react';
import { Card, CardItem, Text } from 'native-base';
import Exercise from './exercise';
import moment from 'moment';

export default class Workout extends Component {
  render() {
    return (
      <Card>
        <CardItem>
          <Text>
            {this.rowHeader()}
          </Text>
          {this.exercisesFrom(this.props.exercises)}
        </CardItem>
      </Card>
    )
  }

  exercisesFrom(exercises) {
    return exercises.map(exercise => <Exercise key={exercise.id} {...exercise} />)
  }

  rowHeader() {
    const date = moment(this.props.occurred_at).format('MMM Do YY');
    const text = `${this.props.routine_name} ${this.props.body_weight.amount} lbs ${date}`;
    return text;
  }
}
