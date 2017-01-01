import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Weight extends Component {
  render() {
    return (
      <Text>{this.props.weight.amount} {this.props.weight.unit}</Text>
    );
  }
}
