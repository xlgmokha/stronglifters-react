export default class Api {
  constructor(configuration, applicationStorage) {
    this.configuration = configuration;
    this.storage = applicationStorage;
  }

  get(relativeUrl, success) {
    const url = this.buildUrlFor(relativeUrl);
    this.defaultHeaders((headers) => {
      console.log(`GET ${url}`);
      this.execute(url, { method: 'GET', headers: headers }, success);
    });
  }

  post(relativeUrl, body, success) {
    const url = this.buildUrlFor(relativeUrl);
    this.defaultHeaders((headers) => {
      console.log(`POST ${url}`);
      this.execute(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      }, success);
    });
  }

  execute(url, options, success) {
    fetch(url, options)
      .then((response) => response.json())
      .then(success)
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

