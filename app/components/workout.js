import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Workout extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Text>{this.props.routine_name}</Text>
        <Text>{this.props.body_weight.amount}</Text>
      </View>
    )
  }
}
