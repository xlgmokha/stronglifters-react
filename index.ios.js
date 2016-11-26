import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import ApplicationShell from './app/components/application-shell'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => ApplicationShell);
