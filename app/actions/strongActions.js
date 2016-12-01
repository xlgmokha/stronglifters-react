import * as types from './actionTypes';
import Api from '../infrastructure/api';

export function login(username, password) {
  return dispatch => {
    console.log(`dispatching login: ${username} ${password}`)
    let body = { username: username, password: password };
    new Api('/sessions').post(body, (json) => {
      dispatch(logged_in(username, json))
    });
  };
}

export function logged_in(username, json) {
  console.log('LOGGED_IN');
  console.dir(json);
  return {
    type: types.LOGGED_IN,
    username: username,
    authentication_token: json.authentication_token,
  }
}
