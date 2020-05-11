import { Connection } from 'mongoose';

import { StoreModelFactory, StoreModel } from './store';
import { UserModelFactory, UserModel } from './user';

export interface IModel {
  Store: StoreModel;
  User: UserModel;
}

let models: IModel;

export function modelsFactory(conn: Connection) {
  if (models) {
    return models;
  }

  const Store = new StoreModelFactory();
  const User = new UserModelFactory();

  models = {
    Store: conn.model('Store', Store.getSchema()),
    User: conn.model('User', User.getSchema())
  };

  return models;
}
