import React from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Spinner, List, ListItem, InputGroup, Input, Icon, Button, Text } from 'native-base';
import * as events from '../services/events';
import DashboardScreen from './dashboard-screen'
import Screen from './screen'

export default class LoginScreen extends Screen {
  constructor(props) {
    super(props)
    this.configuration = this.resolve('configuration');
    this.state = {
      account: { username: 'mokha', password: 'password' },
      eventsOfInterest: [events.LOGGED_IN],
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Title>StrongLifters ({this.configuration.value_for('ENV')})</Title>
        </Header>
        {this.content()}
      </Container>
    )
  }

  content() {
    if (this.state.isLoading) {
      return (
        <Content>
          <Spinner />
        </Content>
      );
    } else {
      return (
        <Content>
          <List>
            <ListItem>
              <InputGroup>
              <Input inlineLabel 
                label="Username" 
                value={this.state.account.username}
                onChangeText={(text) => this.setState({account: {username: text }})}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" />
                <Input secureTextEntry
                  label="Password"
                  value={this.state.account.password}
                  onChangeText={(text) => this.setState({account: {password: text }})}
                />
              </InputGroup>
            </ListItem>
          </List>
          <Button style={{alignSelf: 'center' }} onPress={this.onLogin.bind(this)}>
            Log In
          </Button>
          <Text note>{this.configuration.value_for('API_HOST')}</Text>
        </Content>
      );
    }
  }

  onLogin() {
    this.publish({
      event: events.LOGIN,
      username: this.state.account.username,
      password: this.state.account.password
    });
    this.setState({isLoading: true});
  }

  notify(event) {
    this.setState({isLoading: false});
    this.loadScreen(DashboardScreen, { ...event })
  }
}
