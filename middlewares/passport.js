const passport = require('koa-passport');
const GoogleTokenStrategy = require('passport-google-id-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('config');

const googleConfig = config.get('google');
const facebookConfig = config.get('facebook');

module.exports = () => async (ctx, next) => {
  await passport.use(
    new GoogleTokenStrategy(
      googleConfig,
      async (parsedToken, googleId, done) => {
        // eslint-disable-next-line
        const { email, given_name, family_name, picture } = parsedToken.payload;
        const user = {
          email,
          firstName: given_name,
          lastName: family_name,
          picture,
          id: googleId,
          provider: 'google',
        };
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
        const user = {
          email,
          firstName: first_name,
          lastName: last_name,
          picture,
          id,
          provider: 'facebook',
        };
        await done(null, user);
      },
    ),
  );
  await next();
};