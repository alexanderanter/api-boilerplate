const WebSocketServer = require('websocket').server;
const config = require('config');

const { ALLOWED_ORIGINS } = require('../constants/CONFIGS');

const allowedOrigins = config.get(ALLOWED_ORIGINS);
const ACCEPTED_PROTOCOL = null;
const connections = [];

const originIsAllowed = origin => {
  let allowed = false;
  allowedOrigins.forEach(allowedOrigin => {
    if (origin === allowedOrigin) {
      allowed = true;
    }
  });
  return allowed;
};

const init = server =>
  new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

const connect = req => {
  if (!originIsAllowed(req.origin)) {
    req.reject();
    console.log(`${new Date()} Connection from origin ${req.origin} rejected.`);
    return false;
  }
  const connection = req.accept(ACCEPTED_PROTOCOL, req.origin);
  console.log(`${new Date()} Connection accepted.`);
  connections.push(connection);
  return connection;
};

const listen = connection => {
  connection.on('message', message => {
    if (message.type === 'utf8') {
      console.log(`Received Message: ${message.utf8Data}`);
      const data = JSON.parse(message.utf8Data);
      if (data.type === 'ping') {
        connection.sendUTF(
          JSON.stringify({
            type: 'pong',
            msg: 'Pong!',
          }),
        );
      }
    } else if (message.type === 'binary') {
      console.log(
        `Received Binary Message of ${message.binaryData.length} bytes`,
      );
      connection.sendBytes(message.binaryData);
    }
  });
  connection.on('close', (reasonCode, description) => {
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
  });
};

const broadcast = data => {
  connections.forEach(connection => {
    connection.sendUTF(JSON.stringify(data));
  });
};

module.exports = {
  originIsAllowed,
  init,
  connect,
  listen,
  connections,
  broadcast,
};
