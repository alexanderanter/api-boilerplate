const io = require('socket.io');

const events = require('./events');
const message = require('./events/message');

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
          message.sent(socket);
        }
        socket.broadcast.emit(e, data);
      });
    });
  },
};
