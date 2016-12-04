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
      console.log(`GET ${this.url}`);
      fetch(this.url, { method: 'GET', headers: headers })
        .then((response) => response.json())
        .then((json) => {
          console.dir(json);
          success(json);
        })
        .catch((error) => console.error(error))
        .done();
    });
  }

  post(body, success) {
    const jsonBody = JSON.stringify(body);
    console.log(`POST ${this.url}`);
    console.dir(jsonBody)
    fetch(this.url, {
      method: "POST",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: jsonBody
    })
      .then((response) => response.json())
      .then((json) => {
        console.dir(json);
        success(json);
      })
      .catch((error) => console.error(error))
      .done();
  }

  defaultHeaders(success) {
    this.storage
      .fetch('authentication_token')
      .then((token) => {
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

