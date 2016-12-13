import React, { Component } from 'react';
import { View, Text, Button, ListView, StyleSheet } from 'react-native';
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
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Button onPress={this.onHistory.bind(this)} title="History" />
          <Button onPress={this.onStartWorkout.bind(this)} title="Start Workout" />
          <Button onPress={this.onLogout.bind(this)} title="Logout" />
        </View>
        <View>
          <ListView
            contentContainerStyle={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(row) => <Workout {...row} />}
            enableEmptySections={true}
            />
        </View>
      </View>
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
