export default class Api {
  constructor(configuration, applicationStorage) {
    this.configuration = configuration;
    this.storage = applicationStorage;
  }

  get(relativeUrl, success) {
    let url = this.buildUrlFor(relativeUrl);
    this.defaultHeaders((headers) => {
      console.log(`GET ${url}`);
      fetch(url, { method: 'GET', headers: headers })
        .then((response) => response.json())
        .then((json) => success(json))
        .catch((error) => console.error(error))
        .done();
    });
  }

  post(relativeUrl, body, success) {
    let url = this.buildUrlFor(relativeUrl);
    const jsonBody = JSON.stringify(body);
    console.log(`POST ${url}`);
    fetch(url, {
      method: "POST",
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: jsonBody
    })
      .then((response) => response.json())
      .then((json) => success(json))
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

  buildUrlFor(url) {
    let host = this.configuration.value_for('API_HOST');
    return `${host}/api${url}`
  }
}

