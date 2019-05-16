import { storeModel } from './store';

let models;

export function modelsFactory(conn) {
  if (models) { return models; }

  models = {
    Store: storeModel(conn),
  }

  return models;
}
