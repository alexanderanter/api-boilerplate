/**
 * Pong!
 *
 * @param {*} ctx
 */
const pong = async ctx => {
  ctx.body = { message: 'Pong!' };
};

/**
 * Ping the email server
 * OBS! SHOULD NOT BE OPEN FOR ANY API CALLS. ONLY FOR TESTING PURPOSES
 *
 * @param {*} ctx
 */
const email = async ctx => {
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
const socket = async ctx => {
  ctx.socket.emit('message:seen', 'API was pinged by socket.io');
  ctx.status = 204;
};

/**
 * Ping error
 * Throws an internal server error
 *
 * @param {*} ctx
 */
const error = async ctx => {
  console.log(ctx.errors);
  ctx.throw(new ctx.errors.ClientErrors.BadRequest());
};

module.exports = {
  pong,
  email,
  socket,
  error,
};
