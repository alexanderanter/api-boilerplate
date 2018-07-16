import passport from 'koa-passport';

export const local = async ctx => {
  ctx.status = 501;
  ctx.body = 'Not implemented';
};

export const google = async (ctx, next) => {
  await passport.authenticate('google-id-token', async (err, user, info) => {
    if (err || info) {
      // eslint-disable-next-line
      console.log(`error: ${err}`);
      ctx.body = err || info;
    }
    ctx.user = user;
    await next();
  })(ctx, next);
};

export const facebook = async (ctx, next) => {
  await passport.authenticate('facebook-token', async (err, user, info) => {
    if (err || info) {
      // eslint-disable-next-line
      console.log(`error: ${err}`);
      console.log('info:');
      console.log(info);
      ctx.body = err || info;
    }
    ctx.user = user;
    await next();
  })(ctx, next);
};

export const facebookCallback = async ctx => {
  console.log(ctx);
  ctx.status = 201;
};

export const test = async ctx => {
  // eslint-disable-next-line
  console.log(ctx.status);
  ctx.status = 200;
  ctx.body = 'test';
};
