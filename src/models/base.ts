import { Schema, SchemaDefinition, SchemaOptions, Types, Document, Model } from 'mongoose';

interface IBase {
  getModelName(): String;

  getSchema(): Schema;

  getSchemaDefinition(): SchemaDefinition;

  getSchemaOptions(): SchemaOptions;
}

export abstract class BaseModelFactory<U extends Model<T>, T extends Document> implements IBase {
  abstract getModelName(): string;

  getSchema() {
    return new Schema<T>(this.getSchemaDefinition(), this.getSchemaOptions());
  }

  getSchemaDefinition(): SchemaDefinition {
    return {
      _id: {
        type: Types.ObjectId,
        required: '{PATH} is required',
        auto: true
      }
    };
  }

  abstract getSchemaOptions(): SchemaOptions;
}
