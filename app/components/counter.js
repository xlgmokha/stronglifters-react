import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Counter extends Component {
  render() {
    const { counter, increment, decrement, fetchMovies } = this.props;
    console.log("PROPS");
    console.dir(this.props);
    let moviesCount = this.props.movies ? this.props.movies.length : 0;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{counter}</Text>
        <TouchableOpacity onPress={increment}>
          <Text>up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={decrement}>
          <Text>down</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={fetchMovies}>
          <Text>Async {moviesCount}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
