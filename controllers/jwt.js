const jwt = require('jsonwebtoken');
const config = require('config');

const { secret } = config.get('jwt');

const createToken = user =>
  jwt.sign(
    {
      _id: user._id,
      providerId: user.providerId,
      provider: user.provider,
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

const encode = async (ctx, next) => {
  try {
    ctx.token = createToken(ctx.user.getForJWT());
    await next();
  } catch (error) {
    // TODO: Better error
    ctx.throw(error);
  }
};

const send = async ctx => {
  ctx.set('x-auth-token', ctx.token);
  ctx.status = 200;
  ctx.body = { token: ctx.token, user: ctx.user.getAsObject() };
};

const decode = async (ctx, next) => {
  let { token } = ctx.request.body;
  if (!token) {
    token = ctx.get('x-auth-token');
  }
  try {
    ctx.decoded = jwt.verify(token, secret);
  } catch (err) {
    // TODO: Better error
    ctx.throw(err);
  }
  await next();
};

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
