import { Model, SchemaOptions, Document } from 'mongoose';
import * as _ from 'lodash';

import { BaseModelFactory } from './base';
// import { ModelPlugins } from './plugins';
// import { ModelValidates } from './validates';

export interface IUser extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<IUser> {}

export class UserModelFactory extends BaseModelFactory<UserModel, IUser> {
  getModelName(): string {
    return 'User';
  }

  getSchema() {
    const schema = super.getSchema();

    // schema.plugin(ModelPlugins.creationTimeFromObjectId, void 0).plugin(ModelPlugins.updateTime, void 0);

    return schema;
  }

  getSchemaDefinition() {
    return _.merge(super.getSchemaDefinition(), {});
  }

  getSchemaOptions(): SchemaOptions {
    return {
      collection: 'Users',
      toJSON: { getters: true, virtuals: false },
      toObject: { getters: true },
      id: true,
      _id: true
    };
  }
}
