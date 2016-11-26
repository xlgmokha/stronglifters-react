import React, { Component } from 'react';
import { AppRegistry, Text, ListView, View, Image, TextInput, TouchableHighlight } from 'react-native';
import Api from '../infrastructure/api'
import Movie from './movie'

export default class Movies extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (row, other) => row['title'] != other['title'] });
    this.state = {
      dataSource: this.mapAll([]),
      showText: true,
      text: 'WAT?',
    };
  }

  componentDidMount() {
    var that = this;
    var url = 'https://facebook.github.io/react-native/movies.json'
    new Api(url).get((json) => {
      that.setState({ dataSource: that.mapAll(json.movies) });
    });
    //setInterval(() => {
      //that.setState({ showText: !that.state.showText });
    //}, 1000);
  }

  render() {
    let pic = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' };
    let display = this.state.showText ? this.props.text : ' ';

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image source={pic} style={{width: 193, height: 110}} />
        <Text>{display}</Text>
        <TouchableHighlight onPress={this.onBack.bind(this)}>
          <Text>Back</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => <Movie name={row} />}
          />
      </View>
    );
  }

  mapAll(movies) {
    movies.forEach((item) => console.log(item))
    return this.ds.cloneWithRows(movies.map((item) => item.title));
  }

  onBack() {
    this.props.navigator.pop();
  }
}
