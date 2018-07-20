const { ValidationError } = require('koa-bouncer');
const statuses = require('statuses');

module.exports = function errorHandling() {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // will only respond with JSON
      switch (err) {
        case ValidationError:
          ctx.status = 422;
          break;
        default:
          ctx.status = err.statusCode || err.status || 500;
          if (ctx.status === 500) {
            ctx.app.emit('error', err, ctx);
          }
          break;
      }
      ctx.body = {
        status: ctx.status,
        error: statuses[ctx.status],
        message: err.message,
      };
    }
  };
};
