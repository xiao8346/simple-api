import { Schema, SchemaDefinition, SchemaOptions, Types } from 'mongoose';


interface IBase {
  modelName(): String;

  getSchema(): Schema;

  getSchemaDefinition(): SchemaDefinition;

  getSchemaOptions(): SchemaOptions;
}

export abstract class BaseFactory implements IBase {
  abstract modelName();

  getSchema() {
    return new Schema(this.getSchemaDefinition(), this.getSchemaOptions());
  }

  getSchemaDefinition() {
    return {
      _id: {
        type: Types.ObjectId,
        required: `{PATH} is required`
      }
    }
  }

  abstract getSchemaOptions();
}
