import React, { Component } from 'react';

export default class Screen extends Component {
  componentDidMount() {
    this.eventsOfInterest().forEach((event) => {
      this.props.eventAggregator.subscribe(event, this);
    });
  }

  componentWillUnmount() {
    this.props.eventAggregator.unsubscribe(this);
  }

  publish(event) {
    this.props.eventAggregator.publish(event);
  }

  loadScreen(screen, params = {}) {
    this.props.navigator.push({ component: screen, params });
  }

  eventsOfInterest() {
    if (this.state == null || this.state.eventsOfInterest == undefined) {
      return [];
    }
    return this.state.eventsOfInterest;
  }

  resolve(component) {
    return this.props.registry.resolve(component);
  }
}
