import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';

export default class DashboardScreen extends Component {
  render() {
    console.log("LOADING DASHBOARD");
    return (
      <View>
        <Text>Welcome back !</Text>
      </View>
    );
  }
}
