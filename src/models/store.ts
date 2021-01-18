import { Document, Model } from 'mongoose';
import * as _ from 'lodash';

import { BaseModelFactory } from './base';

export interface IStore extends Document {
  name: string;
  address: string;
  phone: string;
  principal: string;
}

export interface StoreModel extends Model<IStore> { }
export class StoreModelFactory extends BaseModelFactory<StoreModel, IStore> {
  constructor() {
    super();
  }

  getModelName() {
    return 'Store';
  }

  getSchema() {
    const schema = super.getSchema();

    return schema;
  }

  getSchemaDefinition() {
    return _.merge(super.getSchemaDefinition(), {
      name: {
        type: String,
        required: '{PATH} is required'
      },
      address: {
        type: String
      },
      phone: {
        type: String
      },
      principal: {
        type: String
      }
    });
  }

  getSchemaOptions() {
    return {
      collection: 'Stores',
      toJSON: { getters: true, virtuals: false },
      toObject: { getters: true },
      id: true,
      _id: true
    };
  }
}
