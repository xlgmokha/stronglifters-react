import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import Account from '../domain/account'
import Api from '../infrastructure/api'
import DashboardScreen from './dashboard-screen'
import ApplicationComponent from '../components/application-component'
import * as events from '../services/events';

var t = require('tcomb-form-native');
var Form = t.form.Form;

export default class LoginScreen extends ApplicationComponent {
  constructor(props) {
    super(props)
    this.state = {
      account: { username: 'mokha', password: 'password' },
      eventsOfInterest: [events.LOGGED_IN],
    };
  }

  componentDidMount() {
    super.componentDidMount();
    //this.notify({username: 'mokha', gravatar_id: '96c04b963c1ab66002bf3455900a2680' }); // TODO:: REMOVE
  }

  render() {
    return (
      <Container>{this.content()}</Container>
    )
  }

  content() {
    if (this.state.isLoading) {
      return (
        <Content>
          <Spinner />
        </Content>
      );
    }
    else {
      return (
        <Content>
          <Form ref="form"
            type={Account}
            onChange={this.onChange.bind(this)}
            value={this.state.account}
            options={this.formOptions()}
          />
          <Button onPress={this.onLogin.bind(this)} title="Login" />
        </Content>
      );
    }
  }

  formOptions() {
    return {
      auto: 'placeholders',
      fields: { password: { secureTextEntry: true } }
    };
  }

  onLogin() {
    let account = this.refs.form.getValue();
    this.publish({
      event: events.LOGIN,
      username: account.username,
      password: account.password
    });
    this.setState({isLoading: true});
  }

  onChange(account) {
    this.setState({account: account});
  }

  notify(event) {
    this.setState({isLoading: false});
    this.props.navigator.push({
      component: DashboardScreen, params: { ...event }
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
