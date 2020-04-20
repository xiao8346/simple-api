import { StoreFactory, IStoreModel } from './store';

import { Connection } from 'mongoose';

export interface IModel {
  Store: IStoreModel;
}

let models: IModel;

export function modelsFactory(conn: Connection) {
  if (models) { return models; }

  const Store = new StoreFactory();

  models = {
    Store: conn.model('Store', Store.getSchema()),
  }

  return models;
}
