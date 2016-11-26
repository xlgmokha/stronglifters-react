import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import Movies from '../components/movies';
import Account from '../domain/account'
import Api from '../services/api'

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class LoginScreen extends Component {
  static get defaultProps() {
    return { title: 'LoginScreen' };
  }

  render() {
    return (
      <View>
        <View>
          <Text>Login</Text>
        </View>
        <View>
          <Form ref="form" type={Account} options={{}} />
        </View>
        <TouchableHighlight onPress={this.onLogin.bind(this)}>
          <Text>Login</Text>
        </TouchableHighlight>
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

  onLogin() {
    let value = this.refs.form.getValue();
    if (value) {
      body = { username: value.username, password: value.password };
      let that = this;
      new Api('/api/sessions').post(body, (json) => {
        console.log(json);
        that.storeToken("authentication_token", json.token)
      });
    }
  }

  storeToken(key, value) {
    AsyncStorage.setItem(key, value);
  }
}
