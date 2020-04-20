import { Document, Model } from 'mongoose';

import * as _ from 'lodash';

import { BaseFactory } from './base';

export interface IStoreDocument extends Document {
  name: string;
  address: string;
  phone: string;
  principal: string;
}

export interface IStoreModel extends Model<IStoreDocument> { }

export class StoreFactory extends BaseFactory<IStoreDocument, IStoreModel> {
  constructor() { super(); }

  modelName() { return 'Store' };

  getSchema() {
    const schema = super.getSchema();

    return schema;
  }

  getSchemaDefinition() {
    const schemaDefinition = super.getSchemaDefinition();

    return _.assignIn(schemaDefinition, {
      name: {
        type: String,
        required: `{PATH} is required`
      },
      address: {
        type: String,
      },
      phone: {
        type: String,
      },
      principal: {
        type: String
      }
    })
  }

  getSchemaOptions() {
    return {
      toJSON: { getters: true, virtuals: false },
      toObject: { getters: true }
    };
  }
}
