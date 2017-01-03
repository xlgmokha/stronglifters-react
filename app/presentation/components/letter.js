import React, { Component } from 'react';
import Svg, { Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Text, Use, Defs, Stop } from 'react-native-svg';

export default class Letter extends Component {
  render() {
    return (
      <Svg height="50" width="50">
        <Text fill="none" stroke="blue" fontSize="25" fontWeight="bold" x="10" y="10" textAnchor="middle" >{this.props.letter}</Text>
      </Svg>
    );
  }
}
