import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Workout extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10, backgroundColor: '#f6f6f6'}}>
        <Text style={{width: 50, height: 25}}>{this.props.routine_name}</Text>
        <Text style={{width: 100, height: 25}}>{this.props.body_weight.amount} lbs</Text>
        <Text style={{width: 200, height: 25}}>{this.props.occurred_at}</Text>
      </View>
    )
  }
}
