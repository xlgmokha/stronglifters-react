import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Movie extends Component {
  render() {
    return (
      <Text style={{flex: 1}}>{this.props.name}</Text>
    )
  }
}
