import jwt from 'jsonwebtoken';
import config from 'config';

const { secret } = config.get('jwt');

const createToken = user =>
  jwt.sign(
    {
      id: user.id,
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

export const encode = async (ctx, next) => {
  ctx.token = createToken(ctx.user);
  await next();
};

export const send = async ctx => {
  ctx.set('x-auth-token', ctx.token);
  ctx.status = 200;
  ctx.body = { token: ctx.token, user: ctx.user };
};

export const decode = async (ctx, next) => {
  let { token } = ctx.request.body;
  if (!token) {
    token = ctx.get('x-auth-token');
  }
  try {
    ctx.decoded = jwt.verify(token, secret);
  } catch (err) {
    console.log(err);
  }
  await next();
};

export const safeDecodeUser = async (ctx, next) => {
  const { email, firstName, lastName, picture } = ctx.decoded;
  ctx.user = { email, firstName, lastName, picture };
  await next();
};
