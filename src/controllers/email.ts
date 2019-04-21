import { ParameterizedContext as Context } from 'koa';
import * as ServerErrors from '../errors/ServerErrors';

/**
 * Sends an email that is attached to the context
 *
 * @param {*} ctx
 */
export const send = async (ctx: Context) => {
  const { text, subject, recipient, attachment } = ctx.email;
  try {
    await ctx.emailServer.send(subject, text, recipient, attachment);
    // TODO: Don't respond from this method
    ctx.body = {
      message: `Email successfully sent to ${recipient}, check your inbox for login link.`,
    };
  } catch (error) {
    console.log(error);
    const { InternalServerError } = ServerErrors;
    ctx.throw(new InternalServerError());
  }
};

export default {
  send,
};
