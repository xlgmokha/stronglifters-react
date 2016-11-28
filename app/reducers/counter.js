import * as types from '../actions/actionTypes';

const initialState = {
  count: 0
};

export default function counter(state = initialState, action = {}) {
  switch(action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case types.RECEIVED_MOVIES:
      return {
        ...state,
        movies: action.movies,
      };
    default:
      return state;
  }
}
