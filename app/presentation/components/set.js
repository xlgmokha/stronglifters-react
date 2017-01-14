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
      <Button style={{backgroundColor: this.backgroundColor()}} block info onPress={this.onPress.bind(this)}>
      {this.state.actual_repetitions} / {this.props.target_repetitions} @ <Weight weight={this.props.target_weight} />
      </Button>
    );
  }

  onPress() {
    let actual_repetitions = this.isCompleted() ? 0 : this.state.actual_repetitions + 1;
    this.setState({ actual_repetitions });
  }

  isCompleted() {
    console.log([this.state.actual_repetitions, this.props.target_repetitions]);
    return this.state.actual_repetitions === this.props.target_repetitions;
  }

  backgroundColor() {
    if (this.isCompleted()) { return "green"; }
    return this.props.type == "WarmUpSet" ? "pink" : "blue";
  }
}
