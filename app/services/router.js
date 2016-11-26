import React, { Component } from 'react';

export default class Router {
  routeTo(route, navigator) {
    let Component = route.component;
    return (<Component navigator={navigator} {...route.params} />)
  }
}
