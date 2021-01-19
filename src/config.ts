import * as nconf from 'nconf';

nconf
  .argv()
  .env({ separator: '__' })
  .file('config', {
    file: 'config.json',
    dir: '../',
    search: true
  });


export const config = nconf;
