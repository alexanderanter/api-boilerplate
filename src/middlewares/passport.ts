import * as passport from 'koa-passport';
import { Strategy as GoogleTokenStrategy } from 'passport-token-google';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import * as CustomStrategy from 'passport-custom';
import * as config from 'config';

import { decrypt } from '../lib/encryption';
import { Context } from 'koa';
import { NextFunction } from 'express';
import { iUser } from '../models/User';

export default () => async (ctx: Context, next: NextFunction) => {
  const { ContextUser } = ctx.models;
  const { GOOGLE, FACEBOOK } = ctx.constants.CONFIG;
  const googleConfig = config.get(GOOGLE);
  const facebookConfig = config.get(FACEBOOK);

  await passport.use(
    new GoogleTokenStrategy(
      googleConfig,
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: Function,
      ) => {
        // eslint-disable-next-line
        const { email, given_name, family_name, picture } = profile._json;
        const user = {
          email,
          firstName: given_name,
          lastName: family_name,
          picture,
          provider: GOOGLE,
        };
        await done(null, user);
      },
    ),
  );

  await passport.use(
    new FacebookTokenStrategy(
      facebookConfig,
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: Function,
      ) => {
        // eslint-disable-next-line
        const { email, first_name, last_name, id } = profile._json;
        const picture = profile.photos[0].value;
        const user = {
          email,
          firstName: first_name,
          lastName: last_name,
          picture,
          provider: FACEBOOK,
        };
        await done(null, user);
      },
    ),
  );

  const { EMAIL } = ctx.constants.STRATEGIES;

  await passport.use(
    EMAIL,
    new CustomStrategy(async (req: Request, done: Function) => {
      const { User } = ctx.models;
      const hash = ctx.request.header.token;
      await User.findOne(
        { 'token.hash': hash },
        'firstName lastName email _id picture provider token',
        async (err: Error, user: iUser) => {
          if (err) {
            await done(err);
          } else if (!user || user === null) {
            await done(null, null, 'No user found!');
          } else {
            User.update(user, { $unset: { token: 1 } });
            const decrypted = decrypt(user.token);
            const { timestamp } = JSON.parse(decrypted);
            const age = new Date().getTime() - timestamp;
            const expired = age > 300000;
            if (expired) {
              await done(null, null, 'Token expired.');
            }
            await done(null, user);
          }
        },
      );
    }),
  );

  await next();
};
