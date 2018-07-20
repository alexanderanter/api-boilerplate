const passport = require('koa-passport');
const { NotImplemented } = require('../errors/ServerErrors');
const { FACEBOOK_TOKEN, GOOGLE_TOKEN } = require('../lib/constants');

const google = async (ctx, next) => {
  await passport.authenticate(GOOGLE_TOKEN, async (err, user, info) => {
    if (err || info) {
      // eslint-disable-next-line
      console.log(`error: ${err}`);
      ctx.body = err || info;
    }
    ctx.user = user;
    await next();
  })(ctx, next);
};

const facebook = async (ctx, next) => {
  await passport.authenticate(FACEBOOK_TOKEN, async (err, user, info) => {
    if (err || info) {
      // Google returns info on unseccessful sign in attempt
      // TODO: Better errors
      if (info) ctx.throw(info);
      ctx.throw(err);
    }
    ctx.user = user;
    await next();
  })(ctx, next);
};

const email = async (ctx, next) => {
  // TODO: Error
  ctx.throw(NotImplemented);
};

module.exports = {
  google,
  facebook,
  email,
};
