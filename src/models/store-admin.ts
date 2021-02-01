import { Model, SchemaOptions, Document, Schema, Types } from 'mongoose';
import * as _ from 'lodash';
import * as bcrypt from 'bcryptjs';

import { BaseModelFactory } from './base';
import { IStore } from './store';
// import { ModelPlugins } from './plugins';
// import { ModelValidates } from './validates';

export interface IUser extends Document {
  store: Types.ObjectId | IStore;
  account: string;
  password: string;
  email: string;
  phone: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword: (password: string, cb?: any) => boolean;
}

export interface UserModel extends Model<IUser> { }

export class UserModelFactory extends BaseModelFactory<UserModel, IUser> {
  getModelName(): string {
    return 'StoreAdmin';
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
      store: {
        type: Schema.Types.ObjectId,
        required: '{PATH} is required',
      },
      account: {
        type: String,
        required: '{PATH} is required',
        unique: true
      },
      password: {
        type: String,
        required: '{PATH} is required'
      },

      name: {
        type: String,
        require: '{PATH} is required'
      },

      email: {
        type: String,
      },

      phone: {
        type: String
      }
    });
  }

  getSchemaOptions(): SchemaOptions {
    return {
      collection: 'StoreAdmins',
      toJSON: { getters: true, virtuals: false },
      toObject: { getters: true },
      id: true,
      _id: true
    };
  }
}
