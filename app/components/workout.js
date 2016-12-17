import React, { Component } from 'react';
import { Card, CardItem, Text } from 'native-base';
import Exercise from './exercise';
import moment from 'moment';

export default class Workout extends Component {
  render() {
    //{this.exercisesFrom(this.props.exercises)}
    return (
      <Card>
        <CardItem>
          <Text>
            {this.rowText()}
          </Text>
        </CardItem>
      </Card>
    )
  }

  exercisesFrom(exercises) {
    return exercises.map(exercise => <Exercise {...exercise} />)
  }

  rowText() {
    const date = moment(this.props.occurred_at).format('MMM Do YY');
    const text = `${this.props.routine_name} ${this.props.body_weight.amount} lbs ${date}`;
    console.log(text);
    return text;
  }
}
