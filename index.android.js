import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ListView, View } from 'react-native';
import ViewContainer from './app/components/ViewContainer'
import StatusBarBackground from './app/components/StatusBarBackground'

const people = [
  { name: 'mo', age: 32 },
  { name: 'allison', age: 33 },
  { name: 'adia', age: 10 },
  { name: 'nailah', age: 7 },
]

class ApplicationShell extends Component {
  render() {
    return (
      <Navigator
        initialRoute="PeopleIndex"
        ref="appNavigator"
        style={styles.navigatorStyles}
        renderScene={(route, navigator) => { return this._renderScene(route, navigator) }}
      />
    )
  }
  _renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }
    switch(route.ident) {
      case "PeopleIndex":
        return (<PeopleIndexScreen {...globalNavigatorProps} />)
    }
  }
}

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      peopleDataSource: dataSource.cloneWithRows(people)
    };
  }
  render() {
    return (
      <ViewContainer>
        <StatusBarBackground style={{backgroundColor: "mistyrose"}} />
        <ListView
          dataSource={this.state.peopleDataSource}
          renderRow={(person) => { return this._renderPersonRow(person) }}
        />
      </ViewContainer>
    );
  }

  _renderPersonRow(person) {
    return (
      <View style={styles.personRow}>
        <Text style={styles.personName}>{person.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  personRow: {

  },
  personName: {
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
