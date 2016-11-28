import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import Counter from '../components/counter';
import * as counterActions from '../actions/counterActions';
import * as movieActions from '../actions/movieActions';
import { connect } from 'react-redux';

class AwesomeApp extends Component {
  render(){
    const { state, actions } = this.props;
    console.log("PROPYS");
    console.dir(this.props);
    return (
      <Counter counter={state.counter.count} movies={state.movies} {...actions} {...this.props.movieActions} />
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch),
    movieActions: bindActionCreators(movieActions, dispatch),
  })
)(AwesomeApp);
