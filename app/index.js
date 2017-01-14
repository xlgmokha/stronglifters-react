import React, { Component } from 'react';
import { Navigator } from 'react-native';
import NewWorkoutScreen from './presentation/screens/new-workout-screen';
import WireUpComponentsInto from './boot/wire-up-components-into';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.registry = new WireUpComponentsInto().run();
    this.router = this.registry.resolve('router');
  }

  render() {
    return (
      <Navigator
        initialRoute={{component: NewWorkoutScreen, params: {}}}
        renderScene={this.router.routeTo.bind(this.router)}
        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}
