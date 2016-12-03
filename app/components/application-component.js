import React, { Component } from 'react';

export default class ApplicationComponent extends Component {
  componentDidMount() {
    console.log("MOUNTED");
    this.props.eventAggregator.subscribe('LOGGED_IN', this);
  }

  componentWillUnmount() {
    console.log("UNMOUNTING");
    this.props.eventAggregator.unsubscribe(this);
  }
}
