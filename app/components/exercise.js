import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Exercise extends Component {
  render() {
    return(
      <View>
        <Text>{this.props.name}</Text>
        <Text>{this.props.sets.map(set => set.actual_repetitions).join(",")}</Text>
      </View>
    );
  }
}
