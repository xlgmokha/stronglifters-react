import * as types from './actionTypes';
import Api from '../infrastructure/api';

export function increment() {
  return { type: types.INCREMENT };
}

export function decrement() {
  return { type: types.DECREMENT };
}

export function fetchMovies() {
  return dispatch => {
    var url = 'https://facebook.github.io/react-native/movies.json'
    new Api(url).get((json) => dispatch(receiveMovies(json)));
  };
}

export function receiveMovies(json) {
  return {
    type: types.RECEIVED_MOVIES,
    movies: json.movies.map((item) => item.title),
    receivedAt: Date.now()
  }
}
