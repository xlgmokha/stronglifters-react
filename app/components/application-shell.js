import React, { Component } from 'react';
import { AppRegistry, Text, ListView, View, Image, TextInput, Navigator } from 'react-native';
import LoginScreen from '../screens/login-screen'
import Router from '../services/router'

export default class ApplicationShell extends Component {
  constructor(props) {
    super(props);
    this.router = new Router();
  }
  render() {
    return (
      <Navigator
        initialRoute={{component: LoginScreen, params: {}}}
        renderScene={this.router.routeTo}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}
