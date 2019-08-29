import { Schema, Connection, Model } from 'mongoose';
import * as _ from 'lodash';

import { BaseFactory } from './base';

export interface IStore extends Document {
  name: string;
  address: string;
  phone: string;
  principal: string;
}

export class StoreFactory extends BaseFactory<IStore> {
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

export function storeModel(conn: Connection) {
  const storeSchema = new Schema(
    {
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
    },
    {
      toJSON: { getters: true, virtuals: false },
      toObject: { getters: true }
    }
  )

  const Store = conn.model('Store', storeSchema);

  return Store;
}
