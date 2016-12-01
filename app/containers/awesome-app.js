import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import * as movieActions from '../actions/movieActions';
import * as strongActions from '../actions/strongActions';
import { connect } from 'react-redux';
import LoginScreen from '../screens/login-screen'

class AwesomeApp extends Component {
  render(){
    const { state, actions } = this.props;
    return (
      <View>
        <Counter counter={state.counter.count} movies={state.movies} {...actions} {...this.props.movieActions} />
        <LoginScreen {...this.props.strongActions}/>
      </View>
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch),
    movieActions: bindActionCreators(movieActions, dispatch),
    strongActions: bindActionCreators(strongActions, dispatch),
  })
)(AwesomeApp);
