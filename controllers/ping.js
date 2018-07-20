const pong = async ctx => {
  ctx.body = 'Pong!';
};

const error = async ctx => {
  ctx.throw('Ping error');
};

module.exports = {
  pong,
  error,
};
