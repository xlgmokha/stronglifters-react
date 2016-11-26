import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import Account from '../domain/account'
import Api from '../services/api'
import ApplicationStorage from '../domain/application-storage'
import Movies from '../components/movies';
import DashboardScreen from './dashboard-screen'

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.storage = new ApplicationStorage();
  }

  componentDidMount() {
    let token = this.storage.fetch('authentication_token');
    if (token != null) {
      this.openDashboard(this.storage.fetch('username'))
    }
  }

  render() {
    return (
      <View>
        <View>
          <Form ref="form" type={Account} options={{}} />
        </View>
        <TouchableHighlight onPress={this.onLogin.bind(this)}>
          <Text>Login</Text>
        </TouchableHighlight>
      </View>
    )
  }

  onLogin() {
    let value = this.refs.form.getValue();
    console.log(`attempting to login ${value.username}`);

    if (value) {
      body = { username: value.username, password: value.password };
      let that = this;
      new Api('/sessions').post(body, (json) => {
        console.log(json);
        that.storage.save("authentication_token", json.token);
        that.storage.save("username", value.username);
        that.openDashboard(value.username);
      });
    }
  }

  openDashboard(username) {
    this.props.navigator.push({
      component: DashboardScreen, params: { username: username }
    });
  }
}
