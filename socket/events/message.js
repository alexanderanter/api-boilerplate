const sent = (socket, data) => {
  socket.emit('message:seen', 'API can has seen your message!');
};

module.exports = {
  sent,
};
