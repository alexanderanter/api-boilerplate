import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { iUser } from '../models/User';
import { Context } from 'koa';

/**
 * Creates a JSON Web Token based on the user object
 *
 * @param {*} user
 */
export const createToken = (user: iUser, secret: string) =>
  jwt.sign(
    {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    },
    secret,
    {
      expiresIn: '7d',
    },
  );

/**
 * Encodes the context user to create a JSON Web Token
 *
 * @param {*} ctx
 * @param {*} next
 */
export const encode = async (ctx: Context, next: Function) => {
  const { JWT } = ctx.constants.CONFIG;
  const { secret } = config.get(JWT);
  try {
    ctx.token = createToken(ctx.user, secret);
    await next();
  } catch (error) {
    const { InternalServerError } = ctx.errors.ServerErrors;
    ctx.throw(new InternalServerError());
  }
};

/**
 * Sends the JWT
 *
 * @param {*} ctx
 */
export const send = async (ctx: Context) => {
  ctx.set('x-auth-token', ctx.token);
  ctx.status = 200;
  const user = {
    _id: ctx.user._id,
    email: ctx.user.email,
    firstName: ctx.user.firstName,
    lastName: ctx.user.lastName,
    picture: ctx.user.picture,
  };
  ctx.body = { token: ctx.token, user };
};

/**
 * Decodes the JWT and attaches to context
 *
 * @param {*} ctx
 * @param {*} next
 */
export const decode = async (ctx: Context, next: Function) => {
  const { JWT } = ctx.constants.CONFIG;
  const { secret } = config.get(JWT);
  let { token } = ctx.request.body;
  if (!token) {
    token = ctx.get('x-auth-token');
  }
  try {
    ctx.decoded = jwt.verify(token, secret);
  } catch (err) {
    const { Forbidden } = ctx.errors.ClientErrors;
    ctx.throw(new Forbidden());
  }
  await next();
};

/**
 * Extrats only information that is safe to return from the API to external resources
 *
 * @param {*} ctx
 * @param {*} next
 */
export const safeDecodeUser = async (ctx: Context, next: Function) => {
  const { ContextUser } = ctx.models;
  const { email, firstName, lastName, picture } = ctx.decoded;
  ctx.user = new ContextUser({ email, firstName, lastName, picture });
  await next();
};

export default {
  encode,
  send,
  decode,
  safeDecodeUser,
};
