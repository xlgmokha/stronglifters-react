import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import ApplicationStorage from '../infrastructure/application-storage';
import ApplicationComponent from '../components/application-component';
import Workout from '../components/workout';

export default class DashboardScreen extends ApplicationComponent {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (row, other) => row['title'] != other['title'] });
    this.state = {
      dataSource: this.mapAll([]),
      eventsOfInterest: ['FETCHED_WORKOUTS'],
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Stronglifters {this.props.username}</Title>
        </Header>
        <Content>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(row) => <Workout {...row} />}
            enableEmptySections={true}
            />
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
        this.setState({ dataSource: this.mapAll(event.workouts) });
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

  mapAll(workouts) {
    return this.ds.cloneWithRows(workouts);
  }
}
var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});
