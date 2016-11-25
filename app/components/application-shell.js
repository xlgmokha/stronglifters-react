import React, { Component } from 'react';
import { AppRegistry, Text, ListView, View, Image, TextInput, Navigator } from 'react-native';
import MyScene from '../screens/my-scene'

export default class ApplicationShell extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{component: MyScene, params: {title: 'Hello'}}}
        renderScene={this.routeTo}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
  routeTo(route, navigator) {
    let Component = route.component;
    return (<Component navigator={navigator} {...route.params} />)
  }
}
