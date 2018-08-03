/**
 * Sends an email that is attached to the context
 *
 * @param {*} ctx
 */
const send = async ctx => {
  const { text, subject, recipient, attachment } = ctx.email;
  try {
    await ctx.emailServer.send(subject, text, recipient, attachment);
    // TODO: Don't respond from this method
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
