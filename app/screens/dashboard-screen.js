import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import ApplicationStorage from '../infrastructure/application-storage';

export default class DashboardScreen extends Component {
  render() {
    console.log("LOADING DASHBOARD");
    return (
      <View>
        <Text>Welcome back !</Text>
        <Button onPress={this.onHistory.bind(this)} title="History" />
        <Button onPress={this.onStartWorkout.bind(this)} title="Start Workout" />
        <Button onPress={this.onLogout.bind(this)} title="Logout" />
      </View>
    );
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
}
