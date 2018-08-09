const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Creates a JSON Web Token based on the user object
 *
 * @param {*} user
 */
const createToken = (user, secret) =>
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
const encode = async (ctx, next) => {
  const { JWT } = ctx.constants.CONFIGS;
  const { secret } = config.get(JWT);
  try {
    ctx.token = createToken(ctx.user.getForJWT(), secret);
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
const send = async ctx => {
  ctx.set('x-auth-token', ctx.token);
  ctx.status = 200;
  ctx.body = { token: ctx.token, user: ctx.user.getForJWT() };
};

/**
 * Decodes the JWT and attaches to context
 *
 * @param {*} ctx
 * @param {*} next
 */
const decode = async (ctx, next) => {
  const { JWT } = ctx.constants.CONFIGS;
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
const safeDecodeUser = async (ctx, next) => {
  const { ContextUser } = ctx.models;
  const { email, firstName, lastName, picture } = ctx.decoded;
  ctx.user = new ContextUser({ email, firstName, lastName, picture });
  await next();
};

module.exports = {
  encode,
  send,
  decode,
  safeDecodeUser,
};
