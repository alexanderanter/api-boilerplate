import { MongooseDocument } from 'mongoose';

export interface KoaApp {
  controllers: Function[];
  models: MongooseDocument[];
  errors: Error[];
  services: Function[];
  constants: any[];
  context: any;
  ctx: any;
}
