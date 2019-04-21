import { server as WebSocketServer, connection, request } from 'websocket';
import config from 'config';
import { Server } from 'http';

const { ALLOWED_ORIGINS } = require('../constants/CONFIG');

const allowedOrigins: Array<string> = config.get(ALLOWED_ORIGINS);
const ACCEPTED_PROTOCOL: any = null;
const connections: Array<any> = [];

export const originIsAllowed = (origin: string) => {
  let allowed = false;
  allowedOrigins.forEach((allowedOrigin: string) => {
    if (origin === allowedOrigin) {
      allowed = true;
    }
  });
  return allowed;
};

export const init = (server: Server) =>
  new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  });

export const connect = (req: request) => {
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

export const listen = (connection: connection) => {
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

export const broadcast = (data: any) => {
  connections.forEach(connection => {
    connection.sendUTF(JSON.stringify(data));
  });
};

export default {
  originIsAllowed,
  init,
  connect,
  listen,
  connections,
  broadcast,
};
