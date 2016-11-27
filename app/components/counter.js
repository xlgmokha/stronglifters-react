import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Counter extends Component {
  render() {
    const { counter, increment, decrement } = this.props;
    console.dir(this.props);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{counter}</Text>
        <TouchableOpacity onPress={increment}>
          <Text>up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement}>
          <Text>down</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
