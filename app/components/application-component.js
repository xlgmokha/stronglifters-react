import React, { Component } from 'react';

export default class ApplicationComponent extends Component {
  componentDidMount() {
    if (this.state.eventsOfInterest == undefined) {
      return;
    }

    this.state.eventsOfInterest.forEach((event) => {
      this.props.eventAggregator.subscribe(event, this);
    });
  }

  componentWillUnmount() {
    this.props.eventAggregator.unsubscribe(this);
  }

  publish(event) {
    this.props.eventAggregator.publish(event);
  }
}
