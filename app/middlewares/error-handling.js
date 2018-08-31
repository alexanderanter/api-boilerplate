const { ValidationError } = require('koa-bouncer');
const statuses = require('statuses');

const log = require('./logging')();

module.exports = function errorHandling() {
  return async (ctx, next) => {
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
        err.headers.forEach(header => {
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
};
