const passport = require('koa-passport');
const config = require('config');

const { encrypt, decrypt, sha256 } = require('../lib/encryption');
const { NotImplemented } = require('../errors/ServerErrors');
const {
  FACEBOOK_TOKEN,
  GOOGLE_TOKEN,
  PASSWORDLESS_EMAIL,
} = require('../lib/constants');

const { client } = config.get(PASSWORDLESS_EMAIL);

const google = async (ctx, next) => {
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

const facebook = async (ctx, next) => {
  await passport.authenticate(FACEBOOK_TOKEN, async (err, user, info) => {
    if (err || info) {
      // Google returns info on unseccessful sign in attempt
      // TODO: Better errors
      if (info) ctx.throw(info);
      ctx.throw(err);
    }
    ctx.user = user;
    await next();
  })(ctx, next);
};

// TODO: save token to DB
const createEmailToken = async (ctx, next) => {
  const { email } = ctx.request.body;
  const timestamp = Date.now();
  ctx.encrypted = encrypt(JSON.stringify({ email, timestamp }));
  ctx.encrypted.hash = sha256(ctx.encrypted.encrypted);
  await next();
};

const verifyEmailToken = async (ctx, next) => {
  const hash = ctx.request.header.token;
  const { User } = ctx.models;
  await User.findOne(
    { 'token.hash': hash },
    'firstName lastName email _id picture provider token',
    async (err, user) => {
      if (err) ctx.throw(err);
      else if (!user || user === null) ctx.body = 'No user found!';
      ctx.user = user;
    },
  );
  const decrypted = decrypt(ctx.user.token);
  // TODO: timestamp not working
  console.log(decrypted.timestamp);
  if (decrypted.timestamp + 600000 > Date.now()) {
    ctx.body = 'Token expired.';
  } else {
    ctx.body = ctx.user;
  }

  // await passport.authenticate(PASSWORDLESS_EMAIL, async (err, user, info) => {
  //   if (err || info) {
  //     console.log(`error: ${err}`);
  //     if (info) ctx.throw(info);
  //     ctx.throw(err);
  //   }
  //   ctx.user = user;
  //   await next();
  // })(ctx, next);
};

const sendEmail = async ctx => {
  const token = ctx.encrypted.hash;
  const subject = `Login token for ${client}`;
  const text = `Here is your login link: ${client}?token=${token}`;
  const recipient = ctx.request.body.email;
  try {
    await ctx.emailServer.send(subject, text, recipient);
    ctx.body = {
      message: 'Email successfully sent, check your inbox for login link.',
    };
  } catch (error) {
    ctx.throw(error);
  }
};

module.exports = {
  google,
  facebook,
  createEmailToken,
  verifyEmailToken,
  sendEmail,
};
