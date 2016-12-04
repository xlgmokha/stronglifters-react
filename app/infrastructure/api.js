import Config from 'react-native-config';
import ApplicationStorage from './application-storage';

export default class Api {
  constructor(url, storage = new ApplicationStorage()) {
    if (url.startsWith('http')) {
      this.url = url;
    } else {
      this.url = `${Config.API_HOST}/api${url}`
    }
    this.storage = storage;
  }

  get(success) {
    this.defaultHeaders((headers) => {
      fetch(this.url, { method: 'GET', headers: headers })
        .then((response) => response.json())
        .then(success)
        .catch((error) => console.error(error))
        .done();
    });
  }

  post(body, success) {
    fetch(this.url, {
      method: "POST",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then(success)
      .catch((error) => console.error(error))
      .done();
  }

  defaultHeaders(success) {
    this.storage
      .fetch('authentication_token')
      .then((token) => {
        console.dir(token);
        success({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        });
      })
      .catch((error) => console.error(error))
      .done();
  }
}

