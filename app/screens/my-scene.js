import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Movies from '../components/movies'

export default class MyScene extends Component {
  static get defaultProps() {
    return { title: 'MyScene' };
  }

  render() {
    return (
      <View>
        <Text>Hi! My name is {this.props.title}.</Text>
        <TouchableHighlight onPress={this.onForward.bind(this)}>
          <Text>Next</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onBack.bind(this)}>
          <Text>Back</Text>
        </TouchableHighlight>
      </View>
    )
  }

  onForward() {
    this.props.navigator.push({component: Movies, params: {}});
  }

  onBack() {
    this.props.navigator.pop();
  }
}
