import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, DeckSwiper, Text, List, ListItem } from 'native-base';
import Screen from './screen';
import WorkoutScreen from './workout-screen';
import * as events from '../../services/events';

export default class NewWorkoutScreen extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      eventsOfInterest: [ events.FETCHED_NEW_WORKOUT, events.CREATED_WORKOUT ]
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.onLoadWorkout()
  }

  render() {
    if (this.state.isLoading) {
      return ( <Container> <Spinner /> </Container>);
    } else {
      return (
        <Container>
          <Header>
            <Title>Routine {this.state.routine.name}</Title>
          </Header>
          <Content>
            <Button large block iconRight onPress={this.onBeginWorkout.bind(this)}>
              Begin
              <Icon name='ios-arrow-forward' />
            </Button>
            <Text>Body Weight: {this.state.body_weight.amount} {this.state.body_weight.unit}</Text>
            <List dataArray={this.state.exercises} renderRow={this.renderExercise.bind(this)}></List>
            <Button large block iconRight onPress={this.onBeginWorkout.bind(this)}>
              Begin
              <Icon name='ios-arrow-forward' />
            </Button>
          </Content>
        </Container>
      );
    }
  }

  renderExercise(exercise) {
    return (
      <ListItem button onPress={() => this.onPress(exercise)}>
        <View style={{flex: 1}}>
          <Text>{exercise.name}</Text>
          <List dataArray={this.setsFor(exercise)} renderRow={this.renderRow.bind(this)}></List>
        </View>
      </ListItem>
    );
  }

  renderRow(set) {
    return (
      <ListItem button><Text>{set.target_weight.amount} {set.target_weight.unit}</Text></ListItem>
    );
  }

  setsFor(exercise) {
    return this.state.sets.filter((set) => set.exercise_id == exercise.id).filter((set) => set.type == 'WorkSet');
  }

  onPress(exercise) {
   console.log(`pressed ${exercise.name}`);
  }

  onBeginWorkout() {
    const sets = this.state.sets.map((set) => {
      return {
        exercise_id: set.exercise_id,
        target_repetitions: set.target_repetitions,
        target_weight: set.target_weight,
        type: set.type,
      };
    });

    this.publish({
      body_weight: this.state.body_weight,
      event: events.CREATE_WORKOUT,
      routine_id: this.state.routine.id,
      sets: sets,
    });
  }

  onLoadWorkout() {
    this.setState({ isLoading: true });
    this.publish({ event: events.FETCH_NEW_WORKOUT });
  }

  notify(event) {
    switch(event.event) {
      case events.FETCHED_NEW_WORKOUT:
        this.setState({ isLoading: false, ...event });
      case events.CREATED_WORKOUT:
        console.dir(event);
        this.loadScreen(WorkoutScreen, { ...event })
    }
  }
}
