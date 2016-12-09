import React, { Component } from 'react';
import { View, Text, Button, ListView } from 'react-native';
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
      <View style={{flex: 1}}>
        <Text>Welcome back {this.props.username}!</Text>
        <Button onPress={this.loadWorkouts.bind(this)} title="Reload" />
        <Button onPress={this.onHistory.bind(this)} title="History" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => <Workout {...row} />}
          enableEmptySections={true}
          />
        <Button onPress={this.onStartWorkout.bind(this)} title="Start Workout" />
        <Button onPress={this.onLogout.bind(this)} title="Logout" />
      </View>
    );
  }

  loadWorkouts() {
    this.publish({event: 'FETCH_WORKOUTS'});
  }

  notify(event) {
    switch(event.event) {
      case "FETCHED_WORKOUTS":
        this.setState({ dataSource: this.mapAll(event.workouts) });
    }
  }

  onHistory() {
    console.log("load previous workouts");
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
