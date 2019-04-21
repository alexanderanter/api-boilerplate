import passport from 'koa-passport';
import config from 'config';
import { ParameterizedContext as Context } from 'koa';

import { encrypt, sha256 } from '../lib/encryption';
import ContextUser from '../models/ContextUser';

import { GOOGLE, FACEBOOK, EMAIL } from '../constants/STRATEGIES';
import * as ClientErrors from '../errors/ClientErrors';

/**
 * Authentication with Google token
 *
 * @param {*} ctx
 * @param {*} next
 */
export const google = async (ctx: Context, next: any) => {
  await passport.authenticate(GOOGLE, async (err, user, info) => {
    if (err || info) {
      // Google returns info on unseccessful sign in attempt
      // TODO: Better errors
      if (info) ctx.throw(info);
      ctx.throw(err);
    }
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
export const facebook = async (ctx: Context, next: any) => {
  await passport.authenticate(FACEBOOK, async (err, user, info) => {
    if (err || info) {
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
export const createEmailToken = async (ctx: Context, next: any) => {
  const { email } = ctx.request.body;
  const { client } = config.get(EMAIL);
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
export const verifyEmailToken = async (
  ctx: Context,
  next: () => Promise<any>,
) => {
  await passport.authenticate(EMAIL, async (err, user, info) => {
    if (err || info) {
      const { Forbidden } = ClientErrors;
      // info here returns if no user is found (token non existant) or token is expired
      if (info) ctx.throw(new Forbidden());
      ctx.throw(new Forbidden());
    }
    const { ContextUser } = ctx.models;
    ctx.user = new ContextUser(user);
    await next();
  })(ctx, next);
};

export default {
  google,
  facebook,
  createEmailToken,
  verifyEmailToken,
};
