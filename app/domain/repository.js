import Realm from 'realm';
import Account from './account';

export default class Repository {
  constructor() {
    this.realm = new Realm({
      schema: [Account]
    });
  }

  all(type) {
    return this.realm.objects(type);
  }

  count(type) {
    return this.all(type).length;
  }

  save(type, attributes) {
    this.realm.write(() => {
      this.realm.create(type, attributes);
    });
  }

  deleteAll(type){
    this.realm.write(() => {
      this.realm.delete(this.all(type));
    });
  }
}
