import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, DeckSwiper, Text } from 'native-base';
import Screen from './screen';
import * as events from '../services/events';

export default class NewWorkoutScreen extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      eventsOfInterest: [ events.FETCHED_NEW_WORKOUT ]
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.onLoadWorkout()
  }

  render() {
    console.log(this.state.body_weight);
    console.log(this.state.routine);
    console.log(this.state.exercises);
    if (this.state.isLoading) {
      return ( <Container> <Spinner /> </Container>);
    } else {
      return (
        <Container>
          <Header>
            <Title>Routine {this.state.routine.name}</Title>
          </Header>
          <Content>
            <Text>Body Weight: {this.state.body_weight.amount} {this.state.body_weight.unit}</Text>
          </Content>
        </Container>
      );
    }
  }

  onLoadWorkout() {
    this.setState({ isLoading: true });
    this.publish({ event: events.FETCH_NEW_WORKOUT });
  }

  notify(event) {
    switch(event.event) {
      case events.FETCHED_NEW_WORKOUT:
        this.setState({ isLoading: false, ...event });
    }
  }
}
