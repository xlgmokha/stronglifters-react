import React, { Component } from 'react';
import { View, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import Account from '../domain/account'
import Api from '../services/api'
import ApplicationStorage from '../domain/application-storage'
import Movies from '../components/movies';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class LoginScreen extends Component {
  static get defaultProps() {
    return { title: 'LoginScreen' };
  }
  constructor(props) {
    super(props)
    this.storage = new ApplicationStorage();
  }

  componentDidMount() {
    debugger
    let token = this.storage.fetch('authentication_token');
    if (token) {
      this.props.navigator.push({component: Movies, params: {}});
    }
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
        that.storage.save("authentication_token", json.token);
      });
    }
  }
}
