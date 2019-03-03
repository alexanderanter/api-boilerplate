import { ValidationError } from 'koa-bouncer';
import * as statuses from 'statuses';
import { Context } from 'koa';
import { NextFunction } from 'express';

import * as Log from './logging';

export default function errorHandling() {
  const log = Log();
  return async (ctx: Context, next: NextFunction) => {
    try {
      await next();
    } catch (err) {
      log.logger.error(err);
      // will only respond with JSON
      switch (err) {
        case ValidationError:
          ctx.status = 422;
          break;
        default:
          ctx.status = err.statusCode || err.status || 500;
          break;
      }
      if (err.headers) {
        err.headers.forEach((header: any) => {
          const { name, text } = header;
          ctx.set(name, text);
        });
      }
      ctx.body = {
        status: ctx.status,
        error: statuses[ctx.status],
        message: err.message,
      };
    }
  };
}
