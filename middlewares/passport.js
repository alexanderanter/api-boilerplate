const passport = require('koa-passport');
const GoogleTokenStrategy = require('passport-google-id-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const CustomStrategy = require('passport-custom');
const config = require('config');

const googleConfig = config.get('google');
const facebookConfig = config.get('facebook');
const { PASSWORDLESS_EMAIL } = require('../lib/constants');
const { decrypt } = require('../lib/encryption');

module.exports = () => async (ctx, next) => {
  const { ContextUser } = ctx.models;
  await passport.use(
    new GoogleTokenStrategy(
      googleConfig,
      async (parsedToken, googleId, done) => {
        // eslint-disable-next-line
        const { email, given_name, family_name, picture } = parsedToken.payload;
        const user = new ContextUser({
          email,
          firstName: given_name,
          lastName: family_name,
          picture,
          providerId: googleId,
          provider: 'google',
        });
        await done(null, user);
      },
    ),
  );
  await passport.use(
    new FacebookTokenStrategy(
      facebookConfig,
      async (accessToken, refreshToken, profile, done) => {
        // eslint-disable-next-line
        const { email, first_name, last_name, id } = profile._json;
        const picture = profile.photos[0].value;
        const user = new ContextUser({
          email,
          firstName: first_name,
          lastName: last_name,
          picture,
          providerId: id,
          provider: 'facebook',
        });
        await done(null, user);
      },
    ),
  );
  await passport.use(
    PASSWORDLESS_EMAIL,
    new CustomStrategy(async (req, done) => {
      // Some stuff here
      const { User } = ctx.models;
      let contextUser;
      const hash = ctx.request.header.token;
      await User.findOne(
        { 'token.hash': hash },
        'firstName lastName email _id picture provider token',
        async (err, user) => {
          if (err) {
            await done(err);
          } else if (!user || user === null) {
            await done(null, null, 'No user found!');
          } else {
            contextUser = new ContextUser(user);
          }
        },
      );
      const decrypted = decrypt(contextUser.token);
      const { timestamp } = JSON.parse(decrypted);
      const age = new Date().getTime() - timestamp;
      const expired = age > 300000;
      if (expired) {
        await done(null, null, 'Token expired.');
      }
      await done(null, contextUser);
    }),
  );
  await next();
};
