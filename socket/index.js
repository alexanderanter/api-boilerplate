const io = require('socket.io');

const events = [
  'message:sent',
  'message:seen',
  'message:typing',
  'message:stop',
];

module.exports = {
  init: server => io(server),
  listen: socket => {
    // eslint-disable-next-line
    console.log(`Client ${socket.id} connected!`);
    events.forEach(e => {
      socket.on(e, data => {
        // eslint-disable-next-line
        console.log(`Message received: ${data}`);
        if (e === 'message:sent') {
          socket.emit('message:seen', 'API can has seen your message!');
        }
        socket.broadcast.emit(e, data);
      });
    });
  },
};
