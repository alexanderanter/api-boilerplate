export const pong = async ctx => {
  ctx.body = 'Pong!';
};

export const error = async ctx => {
  ctx.throw('Ping error');
};
