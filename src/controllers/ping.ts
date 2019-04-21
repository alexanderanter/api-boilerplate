import { ParameterizedContext as Context } from 'koa';

import * as ClientErrors from '../errors/ClientErrors';

/**
 * Pong!
 *
 * @param {*} ctx
 */
export const pong = async (ctx: Context) => {
  ctx.body = { message: 'Pong!' };
};

/**
 * Ping the email server
 * OBS! SHOULD NOT BE OPEN FOR ANY API CALLS. ONLY FOR TESTING PURPOSES
 *
 * @param {*} ctx
 */
export const email = async (ctx: Context) => {
  // eslint-disable-next-line
  console.log('Should send email');
  try {
    const message = await ctx.emailServer.send(
      'Ping from email',
      'The email service has been pinged',
      'max@karlsson.com.au',
    );
    ctx.body = message;
  } catch (error) {
    ctx.throw(error);
  }
};

/**
 * Ping for socket.io (deprecated)
 *
 * @param {*} ctx
 */
export const socket = async (ctx: Context) => {
  ctx.socket.emit('message:seen', 'API was pinged by socket.io');
  ctx.status = 204;
};

/**
 * Ping error
 * Throws an internal server error
 *
 * @param {*} ctx
 */
export const error = async (ctx: Context) => {
  const { BadRequest } = ClientErrors;
  ctx.throw(new BadRequest());
};

export default {
  pong,
  email,
  socket,
  error,
};
