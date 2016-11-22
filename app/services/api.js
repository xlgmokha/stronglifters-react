export default class Api {
  constructor(url) {
    this.url = url;
  }

  get(success) {
    fetch(this.url)
      .then((response) => response.json())
      .then(success)
      .done();
  }
}

