import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import Exercise from './exercise';

export default class Workout extends Component {
  render() {
    //{this.exercisesFrom(this.props.exercises)}
    return (
      <TouchableHighlight onPress={() => this.pressRow()} underlayColor='rgba(0,0,0,0)'>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {this.rowText()}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  exercisesFrom(exercises) {
    console.dir(exercises);
    return exercises.map(exercise => <Exercise {...exercise} />)
  }

  rowText() {
    return `${this.props.routine_name} ${this.props.body_weight.amount} lbs ${this.props.occurred_at}`;
  }

  pressRow() {
    console.log(`PRESSED: ${this.rowText()}`)
  }
}

var styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});
