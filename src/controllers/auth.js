import passport from 'koa-passport';
import { FACEBOOK_TOKEN, GOOGLE_TOKEN } from '../lib/constants';

export const local = async ctx => {
  ctx.status = 501;
  ctx.body = 'Not implemented';
};

export const google = async (ctx, next) => {
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

export const facebook = async (ctx, next) => {
  await passport.authenticate(FACEBOOK_TOKEN, async (err, user, info) => {
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

export const test = async ctx => {
  // eslint-disable-next-line
  console.log(ctx.status);
  ctx.status = 200;
  ctx.body = 'test';
};
