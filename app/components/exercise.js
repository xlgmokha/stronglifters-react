import React, { Component } from 'react';
import { CardItem, Text } from 'native-base';

export default class Exercise extends Component {
  render() {
    return (
      <CardItem>
        <Text>{this.props.name}</Text>
        {this.props.sets.map((set) => <CardItem key={set.id}><Text>{this.summaryFor(set)}</Text></CardItem>)}
      </CardItem>
    );
  }

  summaryFor(set) {
    return `${set.type} ${set.actual_repetitions}/${set.target_repetitions} @ ${set.target_weight}`;
  }
}
