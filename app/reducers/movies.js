import * as types from '../actions/actionTypes';

const initialState = {
  movies: []
};

export default function movies(state = initialState, action = {}) {
  switch(action.type) {
    case types.RECEIVED_MOVIES:
      return {
        ...state,
        movies: action.movies,
      };
    default:
      return state;
  }
}
