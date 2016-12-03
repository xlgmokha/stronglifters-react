import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Account from '../domain/account'
import Api from '../infrastructure/api'
import DashboardScreen from './dashboard-screen'

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: { username: 'mokha', password: '' }
    };
  }

  componentDidMount() {
    console.log("MOUNTED");
    this.props.eventAggregator.subscribe('LOGGED_IN', this);
  }

  componentWillUnmount() {
    console.log("UNMOUNTING");
    this.props.eventAggregator.unsubscribe(this);
  }

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
    let account = this.refs.form.getValue();
    this.props.login(account.username, account.password);
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
