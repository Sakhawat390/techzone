declare module 'mongoose' {
  // Minimal ambient declarations for projects that don't have @types/mongoose.
  // Provide a generic `Schema` so `new Schema<T>(...)` is allowed.
  export type Document = any;

  export class Schema<T = any> {
    constructor(definition?: any, options?: any);
  }

  export class Model<T = any> {
    constructor(doc?: any);
  }

  export function model<T = any>(name: string, schema?: Schema<any>): Model<T>;
  export const Types: any;
  export function connect(uri: string, options?: any): Promise<any>;

  const mongoose: {
    Schema: typeof Schema;
    model: typeof model;
    Types: any;
    connect: typeof connect;
    [key: string]: any;
  };

  export default mongoose;
}
