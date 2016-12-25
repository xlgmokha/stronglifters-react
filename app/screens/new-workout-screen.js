import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, DeckSwiper, Text } from 'native-base';
import Screen from './screen';
import * as events from '../services/events';

export default class NewWorkoutScreen extends Screen {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      eventsOfInterest: [ events.FETCHED_NEW_WORKOUT ]
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.publish(events.FETCH_NEW_WORKOUT);
    this.setState({ isLoading: true });
  }

  render() {
    if (this.state.isLoading) {
      console.log("loading...");
      return (
        <Container>
          <Spinner />
        </Container>
      );
    } else {
      return (
        <Container>
          <Content>
            <Text>Hello!</Text>
          </Content>
        </Container>
      );
    }
  }
}
