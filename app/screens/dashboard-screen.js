import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import ApplicationStorage from '../infrastructure/application-storage';
import ApplicationComponent from '../components/application-component';
import Workout from '../components/workout';

export default class DashboardScreen extends ApplicationComponent {
  constructor(props) {
    super(props)
    this.state = {
      eventsOfInterest: ['FETCHED_WORKOUTS'],
      workouts: [],
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Stronglifters {this.props.username}</Title>
        </Header>
        <Content>
          {this.state.workouts.map(workout => <Workout key={workout.id} {...workout} />)}
        </Content>
        <Footer>
          <FooterTab>
            <Button transparent onPress={this.onHistory.bind(this)}>
              <Icon name='ios-call' />
            </Button>
            <Button transparent onPress={this.onStartWorkout.bind(this)}>
              <Icon name='ios-call' />
            </Button>
            <Button transparent onPress={this.onLogout.bind(this)}>
              <Icon name='ios-call' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  onHistory() {
    this.publish({event: 'FETCH_WORKOUTS'});
  }

  notify(event) {
    switch(event.event) {
      case "FETCHED_WORKOUTS":
        this.setState({ workouts: event.workouts });
    }
  }

  onStartWorkout() {
    console.log("start workout");
  }

  onLogout() {
    let storage = new ApplicationStorage();
    storage.delete('authentication_token');
    storage.delete('username');
    this.props.navigator.pop();
  }
}
