import { Model, SchemaOptions, Document } from 'mongoose';
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';

import { BaseModelFactory } from './base';
// import { ModelPlugins } from './plugins';
// import { ModelValidates } from './validates';

export interface IUser extends Document {
  name: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword: (password: string, cb?: any) => boolean;
}

export interface UserModel extends Model<IUser> { }

export class UserModelFactory extends BaseModelFactory<UserModel, IUser> {
  getModelName(): string {
    return 'User';
  }

  getSchema() {
    const schema = super.getSchema();

    // schema.plugin(ModelPlugins.creationTimeFromObjectId, void 0).plugin(ModelPlugins.updateTime, void 0);

    schema.pre('save', function (next) {
      const self = this as IUser;

      if (!self.isModified('password')) {
        return next();
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(self.password, salt);

      self.password = passwordHash;

      next();
    });

    schema.methods.comparePassword = function (password: string) {
      return bcrypt.compareSync(password, this.password);
    };

    return schema;
  }

  getSchemaDefinition() {
    return _.merge(super.getSchemaDefinition(), {
      name: {
        type: String,
        required: '{PATH} is required'
      },
      password: {
        type: String,
        required: '{PATH} is required'
      },
      phone: {
        type: String
      }
    });
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
