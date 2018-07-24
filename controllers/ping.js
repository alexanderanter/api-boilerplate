const pong = async ctx => {
  ctx.body = 'Pong!';
};

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

const socket = async ctx => {
  ctx.socket.emit('message:seen', 'API was pinged by socket.io');
  ctx.status = 204;
};

const error = async ctx => {
  ctx.throw('Ping error');
};

module.exports = {
  pong,
  email,
  socket,
  error,
};
