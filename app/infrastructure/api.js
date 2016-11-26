import Config from 'react-native-config';
import ApplicationStorage from './application-storage';

export default class Api {
  constructor(url) {
    if (url.startsWith('http')) {
      this.url = url;
    } else {
      this.url = `${Config.API_HOST}/api${url}`
    }
    this.token = new ApplicationStorage().fetch('authentication_token');
    console.log(this.url);
  }

  get(success) {
    fetch(this.url, {
      method: 'GET',
      headers: this.defaultHeaders(),
    })
    .then((response) => response.json())
    .then(success)
    .catch((error) => console.error(error))
    .done();
  }

  post(body, success) {
    fetch(this.url, {
      method: "POST",
      headers: this.defaultHeaders(),
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then(success)
    .catch((error) => console.error(error))
    .done();
  }

  defaultHeaders() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }
  }
}

