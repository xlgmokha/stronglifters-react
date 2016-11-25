import React, { Component } from 'react';
import { AppRegistry, Text, ListView, View, Image, TextInput } from 'react-native';
import Movies from './movies'

export default class ApplicationShell extends Component {
  render() {
    return (
      <Movies />
    );
  }
}
