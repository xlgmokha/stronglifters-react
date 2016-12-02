import * as types from '../actions/actionTypes';

const initialState = {
  username: '',
  authentication_token: '',
};

export default function stronglifters(state = initialState, action = {}) {
  switch(action.type) {
    case types.LOGGED_IN:
      return {
        ...state,
        username: action.username,
        authentication_token: action.authentication_token,
      };
    default:
      return state;
  }
}
