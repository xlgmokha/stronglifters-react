import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { H1, Card, CardItem, Text, Thumbnail, Button, Icon, List } from 'native-base';
import ExerciseSummary from './exercise-summary';
import moment from 'moment';
import Letter from './letter';

export default class WorkoutSummary extends Component {
  render() {
    const date = moment(this.props.occurred_at).format('MMM Do YYYY');
    const text = `${this.props.body_weight.amount} lbs`;
    return (
			<Card style={{ flex: 0 }}>
        <CardItem style={{flex: 1, flexDirection: 'row'}}>
          <Letter key={this.props.routine_name} letter={this.props.routine_name} />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text>{date}</Text>
            <Text note>{text}</Text>
          </View>
        </CardItem>
        <List>
          {this.exercisesFrom(this.props.exercises)}
        </List>
		 </Card>
    )
  }

  exercisesFrom(exercises) {
    return exercises.map(exercise => <ExerciseSummary key={exercise.id} {...exercise} />)
  }
}
