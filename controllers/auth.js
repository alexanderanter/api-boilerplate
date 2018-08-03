const passport = require('koa-passport');
const config = require('config');

const { encrypt, sha256 } = require('../lib/encryption');
const { NotImplemented } = require('../errors/ServerErrors');
const {
  FACEBOOK_TOKEN,
  GOOGLE_TOKEN,
  PASSWORDLESS_EMAIL,
} = require('../constants');

const { client } = config.get(PASSWORDLESS_EMAIL);

/**
 * Authentication with Google token
 *
 * @param {*} ctx
 * @param {*} next
 */
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

/**
 * Authentication with Facebook token
 *
 * @param {*} ctx
 * @param {*} next
 */
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

/**
 * Creates an encrypted token based on timestamp and email address.
 * Adds the token to the context and adds email to context for downstream middleware sending
 *
 * @param {*} ctx
 * @param {*} next
 */
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

/**
 * Verifies token from email by using passport custom strategy implemented in middlewares/passport
 *
 * @param {*} ctx
 * @param {*} next
 */
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
