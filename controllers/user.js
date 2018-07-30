const create = async ctx => {
  const { User } = ctx.models;
  const { firstName, lastName, email, picture, provider, id } = ctx.user;
  try {
    const userModel = await new User({
      firstName,
      lastName,
      email,
      picture,
      provider,
      providerId: id,
    });
    await userModel.save();
    ctx.user = userModel;
  } catch (error) {
    ctx.body = error;
  }
};

const match = async (ctx, next) => {
  const { User } = ctx.models;
  await User.findOne(
    { email: ctx.user.email },
    'firstName lastName email _id picture provider',
    async (err, user) => {
      if (err) {
        ctx.throw(err);
      } else if (!user) {
        try {
          await create(ctx);
          await next();
        } catch (error) {
          ctx.throw(error);
        }
      } else if (user) {
        ctx.user = user;
        await next();
      }
    },
  );
};

const list = async ctx => {
  const { User } = ctx.models;
  ctx
    .validateQuery('page')
    .defaultTo(1)
    .toInt()
    .gte(1);
  // ctx
  //   .validateQuery('limit')
  //   .defaultTo(10)
  //   .toInt()
  //   .gte(1);
  const { page, limit } = ctx.vals;
  const count = await ctx.services.user.count(ctx);
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit);
  ctx.body = {
    count,
    page,
    limit,
    users,
  };
};

const saveEmailToken = async (ctx, next) => {
  const { email } = ctx.request.body;
  const { User } = ctx.models;
  const { encrypted } = ctx;
  await User.updateOne({ email }, { token: encrypted }, async (err, res) => {
    if (err) {
      ctx.throw(err);
    }
    if (res.nModified === 0) {
      ctx.user = {
        firstName: null,
        lastName: null,
        email,
        picture: null,
        provider: 'email',
        id: null,
        token: encrypted,
      };
      await create(ctx);
    }
  });
  await next();
};

module.exports = {
  create,
  match,
  list,
  saveEmailToken,
};
