import t from 'tcomb-form-native';

export default Account = t.struct({
  username: t.String,
  password: t.String
});
