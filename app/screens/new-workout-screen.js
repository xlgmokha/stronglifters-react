import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, DeckSwiper, Text } from 'native-base';
import Screen from './screen';
import * as events from '../services/events';

export default class NewWorkoutScreen extends Screen {
  render() {
    return (
      <Container>
        <Content>
          <Text>Yo!</Text>
        </Content>
      </Container>
    );
  }
}
