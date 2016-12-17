import React, { Component } from 'react';
import { CardItem, Text } from 'native-base';

export default class Exercise extends Component {
  render() {
    return (
      <CardItem>
        <Text>{this.props.name} {this.actualReps()}</Text>
      </CardItem>
    );
  }

  actualReps(set) {
    return this.props.sets.map((set) => set.actual_repetitions).filter((rep) => rep).join("/");
  }
}
