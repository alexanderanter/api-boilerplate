import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import path from 'path';
import bouncer from 'koa-bouncer';
import passport from 'koa-passport';
import http from 'http';
import send from 'koa-send';

import errorHandling from './middlewares/error-handling';
import passportConfig from './middlewares/passport';
import log from './middlewares/logging';

import emailServer from './lib/emailServer';
// import init from './lib/init';
import routes from './routes';
import socket from './socket';
import db from './lib/db';

import {
  WS_CONNECTION,
  STANDARD_PORT,
  STATIC_FOLDER,
} from './constants/CONFIG';

import * as EVENTS from './constants/EVENTS';

const app = new Koa();
const server = http.createServer(app.callback());
const ws = socket.init(server);

app.context.send = send;

db.connect();

// Logging
app.use(log());

// error handling
app.use(errorHandling());

// validate
app.use(bouncer.middleware());

// static
app.use(koaStatic(path.resolve(__dirname, STATIC_FOLDER)));

// middleware
app.use(
  koaBody({
    json: true,
    strict: false,
  }),
);
app.use(helmet());
app.use(cors());

// init(app);

// Email server
app.context.emailServer = emailServer;
app.context.emailServer.connect(app);

// Passport must come after emailServer connect
app.use(passport.initialize());
app.use(passportConfig());

// Connect websockets
ws.on(WS_CONNECTION, req => {
  const connection = socket.connect(req);
  if (connection) {
    socket.listen(connection);
  }
});

routes(app);

const { LISTENING_ON } = EVENTS;

const port = process.env.PORT || STANDARD_PORT;
server.listen(port);
console.log(`${LISTENING_ON}: ${port}`);

export default { app, server };
