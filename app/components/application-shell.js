import React, { Component } from 'react';
import { AppRegistry, Text, ListView, View } from 'react-native';
import ViewContainer from './ViewContainer'
import StatusBarBackground from './StatusBarBackground'
import Api from '../services/api'

export default class ApplicationShell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => {
          debugger
          return row1 != row2;
        }
      })
    };
  }
  componentDidMount() {
    var that = this;
    var url = 'https://facebook.github.io/react-native/movies.json'
    new Api(url).get((json) => {
      that.setState({ dataSource: that.mapAll(json.movies) });
    });
  }
  render() {
    return (
      <ViewContainer>
        <StatusBarBackground style={{backgroundColor: "mistyrose"}} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
        />
      </ViewContainer>
    );
  }
  renderMovie(movie) {
    return (
      <View>
        <Text>{movie.title}</Text>
      </View>
    )
  }
  mapAll(movies) {
    return this.state.dataSource.cloneWithRows(movies);
  }
}
