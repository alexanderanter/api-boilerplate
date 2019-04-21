import { MongooseDocument } from 'mongoose';
import Koa from 'koa';

export interface KoaApp extends Koa {
  controllers: Function[];
  models: MongooseDocument[];
  errors: Error[];
  services: Function[];
  constants: any[];
  context: any;
  ctx: any;
}
