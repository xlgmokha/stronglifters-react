import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardItem, Text, Thumbnail, Button, Icon, ListItem } from 'native-base';

export default class ExerciseSummary extends Component {
  render() {
    return (
      <View>
        <ListItem itemDivider>
          <Text>{this.props.name}</Text>
        </ListItem>
        {
          this.workSets().map((set) =>
            <ListItem key={set.id}>
              <Text>{this.summaryFor(set)}</Text>
            </ListItem>
          )
        }
      </View>
    );
  }

  workSets() {
    return this.props.sets.filter((set) => set.type == "WorkSet");
  }

  summaryFor(set) {
    let actual_repetitions = set.actual_repetitions || 0;
    return `${actual_repetitions}/${set.target_repetitions} @ ${set.target_weight.amount} ${set.target_weight.unit}`;
  }
}
