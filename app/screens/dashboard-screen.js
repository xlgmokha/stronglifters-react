import * as events from '../services/events';
import NewWorkoutScreen from './new-workout-screen';
import React, { Component } from 'react';
import Screen from './screen';
import WorkoutSummary from '../components/workout-summary';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, DeckSwiper } from 'native-base';
import { Platform, View, Image } from 'react-native';

export default class DashboardScreen extends Screen {
  constructor(props) {
    super(props)
    this.state = {
      eventsOfInterest: [events.FETCHED_WORKOUTS],
      workouts: [],
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.onLoadHistory();
  }

  render() {
    let content = this.state.isLoading ? <Spinner /> : this.renderWorkouts(this.state.workouts);
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
              <Icon name='ios-play' />
            </Button>
            <Button transparent onPress={this.onLogout.bind(this)}>
              <Icon name='ios-log-out' />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  renderWorkouts(workouts) {
    let renderEach = (workout) => <WorkoutSummary key={workout.id} {...workout} />;
    if (Platform.OS == 'ios') {
      return (
        <DeckSwiper dataSource={workouts} renderItem={renderEach} />
      );
    } else {
      return (
        <View>{workouts.map(renderEach)}</View>
      );
    }
  }

  onLoadHistory() {
    this.setState({isLoading: true})
    this.publish({event: events.FETCH_WORKOUTS});
  }

  notify(event) {
    switch(event.event) {
      case events.FETCHED_WORKOUTS:
        this.setState({
          isLoading: false,
          workouts: event.workouts
        });
    }
  }

  onStartWorkout() {
    console.log("start workout");
    this.loadScreen(NewWorkoutScreen)
  }

  onLogout() {
    this.publish({event: events.LOGOUT})
    this.props.navigator.pop();
  }

  gravatarUri() {
    const secureHost = "https://secure.gravatar.com/avatar";
    return `${secureHost}/${this.props.gravatar_id}?s=32&d=mm`;
  }
}
