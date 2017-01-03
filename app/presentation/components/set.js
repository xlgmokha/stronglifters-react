import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon, Spinner, Text } from 'native-base';
import Weight from './weight';

export default class Set extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actual_repetitions: 0
    };
  }
  render() {
    return (
      <Button block info>
      {this.state.actual_repetitions} / {this.props.target_repetitions} @ <Weight weight={this.props.target_weight} />
      </Button>
    );
  }
}
