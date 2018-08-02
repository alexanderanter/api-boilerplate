const passport = require('koa-passport');
const config = require('config');

const { encrypt, sha256 } = require('../lib/encryption');
const { NotImplemented } = require('../errors/ServerErrors');
const {
  FACEBOOK_TOKEN,
  GOOGLE_TOKEN,
  PASSWORDLESS_EMAIL,
} = require('../lib/constants');

const { client } = config.get(PASSWORDLESS_EMAIL);

const google = async (ctx, next) => {
  await passport.authenticate(GOOGLE_TOKEN, async (err, user, info) => {
    if (err || info) {
      // eslint-disable-next-line
      console.log(`error: ${err}`);
      ctx.body = err || info;
    }
    const { ContextUser } = ctx.models;
    ctx.user = new ContextUser(user);
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
    const { ContextUser } = ctx.models;
    ctx.user = new ContextUser(user);
    await next();
  })(ctx, next);
};

// TODO: save token to DB
const createEmailToken = async (ctx, next) => {
  const { email } = ctx.request.body;
  const timestamp = Date.now();
  ctx.encrypted = encrypt(JSON.stringify({ email, timestamp }));
  ctx.encrypted.hash = sha256(ctx.encrypted.encrypted);
  const loginLink = `${client}?token=${ctx.encrypted.hash}`;
  ctx.email = {
    subject: `Login token for ${client}`,
    text: `Here is your login link: ${loginLink}`,
    recipient: ctx.request.body.email,
  };
  await next();
};

const verifyEmailToken = async (ctx, next) => {
  await passport.authenticate(PASSWORDLESS_EMAIL, async (err, user, info) => {
    if (err || info) {
      // TODO: Better errors
      // info here returns if no user is found (token non existant) or token is expired
      if (info) ctx.throw(info);
      ctx.throw(err);
    }
    const { ContextUser } = ctx.models;
    ctx.user = new ContextUser(user);
    await next();
  })(ctx, next);
};

module.exports = {
  google,
  facebook,
  createEmailToken,
  verifyEmailToken,
};
