import { Schema, SchemaDefinition, SchemaOptions, Types, Model } from 'mongoose';

interface IBase {
  modelName(): String;

  getSchema(): Schema;

  getSchemaDefinition(): SchemaDefinition;

  getSchemaOptions(): SchemaOptions;
}

export abstract class BaseFactory
  <T extends Document> implements IBase {
  abstract modelName(): string;

  getSchema() {
    return new Schema<T>(this.getSchemaDefinition(), this.getSchemaOptions());
  }

  getSchemaDefinition() {
    return {
      _id: {
        type: Types.ObjectId,
        required: `{PATH} is required`
      }
    }
  }

  abstract getSchemaOptions(): SchemaOptions;
}