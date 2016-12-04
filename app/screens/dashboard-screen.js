import React, { Component } from 'react';
import { View, Text, Button, ListView } from 'react-native';
import ApplicationStorage from '../infrastructure/application-storage';
import ApplicationComponent from '../components/application-component';

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
    console.log("LOADING DASHBOARD");
    return (
      <View>
        <Text>Welcome back {this.props.username}!</Text>
        <Button onPress={this.loadWorkouts.bind(this)} title="Reload" />
        <Button onPress={this.onHistory.bind(this)} title="History" />
        <Button onPress={this.onStartWorkout.bind(this)} title="Start Workout" />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => <Movie name={row} />}
          />
        <Button onPress={this.onLogout.bind(this)} title="Logout" />
      </View>
    );
  }

  loadWorkouts() {
    this.publish({event: 'FETCH_WORKOUTS'});
  }

  notify(event) {
    console.dir(event);
    switch(event.event) {
      case "FETCHED_WORKOUTS":
        this.setState({ dataSource: this.mapAll(event.workouts) });
    }
  }

  onHistory() {
    console.log("load previous workouts");
  }

  onStartWorkout() {
    console.log("load previous workouts");
  }

  onLogout() {
    console.log("logout");
    let storage = new ApplicationStorage();
    storage.delete('authentication_token');
    storage.delete('username');
    this.props.navigator.pop();
  }

  mapAll(workouts) {
    workouts.forEach((item) => console.log(item))
    return this.ds.cloneWithRows(workouts.map((item) => item.title));
  }
}
