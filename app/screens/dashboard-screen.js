import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner } from 'native-base';
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

  componentDidMount() {
    super.componentDidMount();
    this.onLoadHistory();
  }

  render() {
    let content = this.state.isLoading ? <Spinner /> : this.state.workouts.map(workout => <Workout key={workout.id} {...workout} />);
    return (
      <Container>
        <Header>
          <Title>Stronglifters {this.props.username}</Title>
        </Header>
        <Content>
          {content}
        </Content>
        <Footer>
          <FooterTab>
            <Button transparent active onPress={this.onLoadHistory.bind(this)}>
              <Icon name='ios-home' />
            </Button>
            <Button transparent onPress={this.onStartWorkout.bind(this)}>
              <Icon name='ios-camera-outline' />
            </Button>
            <Button transparent onPress={this.onLogout.bind(this)}>
              <Icon name='ios-compass' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  onLoadHistory() {
    this.setState({isLoading: true})
    this.publish({event: 'FETCH_WORKOUTS'});
  }

  notify(event) {
    switch(event.event) {
      case "FETCHED_WORKOUTS":
        this.setState({
          isLoading: false,
          workouts: event.workouts
        });
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
