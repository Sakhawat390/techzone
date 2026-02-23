declare module 'mongoose' {
  // Minimal ambient declarations for projects that don't have @types/mongoose.
  // These keep imports like `import { Schema, model, Document } from 'mongoose'` working.
  export type Document = any;
  export const Schema: any;
  export function model<T = any>(name: string, schema?: any): T;
  export const Types: any;
  export function connect(uri: string, options?: any): Promise<any>;

  const mongoose: {
    Schema: any;
    model: typeof model;
    Types: any;
    connect: typeof connect;
    [key: string]: any;
  };

  export default mongoose;
}
