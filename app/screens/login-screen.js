import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Account from '../domain/account'
import Api from '../infrastructure/api'
import ApplicationStorage from '../infrastructure/application-storage'
import Movies from '../components/movies';
import DashboardScreen from './dashboard-screen'

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.storage = new ApplicationStorage();
    this.state = {
      account: { username: 'mokha', password: '' }
    };
  }

  //componentDidMount() {
    //let token = this.storage.fetch('authentication_token');
    //if (token != null) {
      //this.openDashboard(this.storage.fetch('username'))
    //}
  //}

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Form ref="form"
            type={Account}
            onChange={this.onChange.bind(this)}
            value={this.state.account}
            options={this.formOptions()}
          />
        </View>
        <Button onPress={this.onLogin.bind(this)} title="Login" />
      </View>
    )
  }

  formOptions() {
    return {
      auto: 'placeholders',
      fields: { password: { secureTextEntry: true } }
    };
  }

  onLogin() {
    let value = this.refs.form.getValue();
    console.log(`attempting to login ${value.username}`);

    if (value) {
      this.props.login(value.username, value.password);
      //body = { username: value.username, password: value.password };
      //let that = this;
      //new Api('/sessions').post(body, (json) => {
        //console.log(json);
        //that.storage.save("authentication_token", json.token);
        //that.storage.save("username", value.username);
        //that.openDashboard(value.username);
      //});
    }
  }

  onChange(account) {
    this.setState({account: account});
  }

  openDashboard(username) {
    this.props.navigator.push({
      component: DashboardScreen, params: { username: username }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48bbec',
    borderColor: '#48bbed',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
