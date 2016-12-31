import * as events from '../services/events';
import React, { Component } from 'react';
import { View } from 'react-native';
import Screen from './screen';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, DeckSwiper, Text, List, ListItem } from 'native-base';

export default class WorkoutScreen extends Screen {
  render() {
    return (
      <Container>
        <Header>
          <Title>Routine {this.props.routine.name}</Title>
        </Header>
        <Content>
          <List dataArray={this.props.exercises} renderRow={this.renderExercise.bind(this)}></List>
        </Content>
      </Container>
    );
  }

  renderExercise(exercise) {
    const sets = this.props.sets.filter((set) => set.exercise_id == exercise.id);
    return (
      <ListItem button>
        <View style={{flex: 1}}>
          <Text>{exercise.name}</Text>
          {sets.map((set) => <Button key={set.id} rounded info>{set.actual_repetitions || ' '}</Button>)}
        </View>
      </ListItem>
    );
  }
}
