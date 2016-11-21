import React, { Component, View } from 'react';
import { Text } from 'react-native';

export default class StatusBarBackground extends Component {
  render() {
    return (
      <View style={{backgroundColor: 'pink'}, this.props.style || {}}>
        <Text>Hello</Text>
      </View>
    );
  }
}
