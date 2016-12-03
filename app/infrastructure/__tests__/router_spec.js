import 'react-native';
import React, { Component } from 'react';
import Router from '../router';
import renderer from 'react-test-renderer';

describe("Router", () => {
  class MyComponent extends Component { }

  let subject = null;
  beforeEach(() => {
    eventAggregator = {}
    subject = new Router({ eventAggregator });
  });

  describe("#routeTo", () => {
    let params = { personId: 1 };
    let route = { component: MyComponent, params: params };
    let navigator = {};

    it("renders a new component", () => {
      result = subject.routeTo(route, navigator);
      expect(result.type).toEqual(MyComponent);
    });

    it ("attaches the navigator", () => {
      result = subject.routeTo(route, navigator);
      expect(result.props.navigator).toEqual(navigator);
    });

    it ("attaches each of the router dependencies", function() {
      result = subject.routeTo(route, navigator);
      expect(result.props.eventAggregator).toEqual(eventAggregator);
    });

    it ("attaches each of the route params", function() {
      result = subject.routeTo(route, navigator);
      expect(result.props.personId).toEqual(params.personId);
    });
  });
});
