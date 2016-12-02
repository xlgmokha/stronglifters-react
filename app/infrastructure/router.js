import React, { Component } from 'react';

export default class Router {
  constructor(dependencies) {
    this.dependencies = dependencies;
  }

  routeTo(route, navigator) {
    let Component = route.component;
    return (
      <Component
        navigator={navigator}
        {...route.params}
        {...this.dependencies}
      />
    );
  }
}
