import React from 'react';
import { View } from 'react-native';
import { Container, Header, Title, Content, Spinner, List, ListItem, InputGroup, Input, Icon, Button, Text } from 'native-base';
import Api from '../infrastructure/api'
import DashboardScreen from './dashboard-screen'
import ApplicationComponent from '../components/application-component'
import Configuration from '../infrastructure/configuration'
import * as events from '../services/events';

export default class LoginScreen extends ApplicationComponent {
  constructor(props) {
    super(props)
    this.configuration = new Configuration('development');
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
    }
    else {
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

  formOptions() {
    return {
      auto: 'placeholders',
      fields: { password: { secureTextEntry: true } }
    };
  }

  onLogin() {
    let account = this.state.account;
    console.log("LOGGING IN");
    console.log(account);
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
