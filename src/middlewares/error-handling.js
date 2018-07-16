import { ValidationError } from 'koa-bouncer';
import statuses from 'statuses';

export default function errorHandling() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      if (err instanceof ValidationError) {
        ctx.status = 422;
      }
      if (ctx.status === 500) {
        ctx.app.emit('error', err, ctx);
      }
      ctx.body = {
        status: ctx.status,
        error: statuses[ctx.status],
        message: err.message,
      };
    }
  };
}
