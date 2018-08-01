const send = async ctx => {
  const { text, subject, recipient, attachment } = ctx.email;
  try {
    await ctx.emailServer.send(subject, text, recipient, attachment);
    ctx.body = {
      message: 'Email successfully sent, check your inbox for login link.',
    };
  } catch (error) {
    ctx.throw(error);
  }
};

module.exports = {
  send,
};
