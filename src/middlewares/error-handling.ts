import { ValidationError } from 'koa-bouncer';
import statuses from 'statuses';
import { Context } from 'koa';
import { NextFunction } from 'express';

import Log from './logging';

export default function errorHandling() {
  return async (ctx: Context, next: NextFunction) => {
    try {
      await next();
    } catch (err) {
      ctx.log.error(err);
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
