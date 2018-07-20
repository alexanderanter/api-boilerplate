const events = [
  'message:sent',
  'message:seen',
  'message:typing',
  'message:stop',
];

module.exports = socket => {
  events.forEach(e => {
    socket.on(e, data => {
      console.log(`Message received: ${data}`);
      if (e === 'message:sent') {
        socket.emit('message:seen', 'API can has seen your message!');
      }
      socket.broadcast.emit(e, data);
    });
  });
};
