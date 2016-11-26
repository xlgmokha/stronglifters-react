import Config from 'react-native-config';

export default class Api {
  constructor(url) {
    this.url = `${Config.API_HOST}${url}`
    console.log(this.url);
  }

  get(success) {
    fetch(this.url)
      .then((response) => response.json())
      .then(success)
      .catch((error) => console.error(error))
      .done();
  }

  post(body, success) {
    fetch(this.url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then((response) => response.json())
    .then(success)
    .catch((error) => console.error(error))
    .done();
  }
}

