import React, { Component } from 'react';
import { View, Image } from 'react-native';
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
    let gravatarUri = this.gravatarUri();
    return (
      <Container>
        <Header>
          <Title>{this.props.username}</Title>
          <Button transparent rounded>
            <Image source={{uri: gravatarUri}} style={{width: 32, height: 32}} />
          </Button>
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
    this.publish({event: 'LOGOUT'})
    this.props.navigator.pop();
  }

  gravatarUri() {
    const secureHost = "https://secure.gravatar.com/avatar";
    return `${secureHost}/${this.props.gravatar_id}?s=32&d=mm`;
  }
}
