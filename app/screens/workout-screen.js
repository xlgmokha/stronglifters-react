import * as events from '../services/events';
import React, { Component } from 'react';
import Screen from './screen';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Icon, Spinner, DeckSwiper, Text, List, ListItem } from 'native-base';

export default class WorkoutScreen extends Screen {
  render() {
    return (
      <Container>
        <Header>
          <Title>Routine {this.props.routine.name}</Title>
        </Header>
        <Content>
          <List dataArray={this.props.sets} renderRow={this.renderSet.bind(this)}></List>
        </Content>
      </Container>
    );
  }

  renderSet(set) {
    return (
      <Text>hello</Text>
    );
  }
}
