import React, { Component } from 'react';
import { CardItem, Text } from 'native-base';

export default class Exercise extends Component {
  render() {
    return (
      <CardItem>
        <Text>{this.props.name}</Text>
        {this.workSets().map((set) => <CardItem key={set.id}><Text note>{this.summaryFor(set)}</Text></CardItem>)}
      </CardItem>
    );
  }

  workSets() {
    return this.props.sets.filter((set) => set.type == "WorkSet");
  }

  summaryFor(set) {
    let actual_repetitions = set.actual_repetitions || 0;
    return `${actual_repetitions}/${set.target_repetitions} @ ${set.target_weight}`;
  }
}
