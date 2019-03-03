import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import * as koaBody from 'koa-body';
import * as koaStatic from 'koa-static';
import * as path from 'path';
import * as bouncer from 'koa-bouncer';
import * as passport from 'koa-passport';
import * as http from 'http';
import * as send from 'koa-send';

import errorHandling from './middlewares/error-handling';
import passportConfig from './middlewares/passport';
import log from './middlewares/logging';

import emailServer from './lib/emailServer';
import init from './lib/init';
import routes from './routes';
import socket from './socket';
import db from './lib/db';

import {
  WS_CONNECTION,
  STANDARD_PORT,
  STATIC_FOLDER,
  EVENTS,
} from './constants/CONFIG';

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

init(app);

// Email server
app.context.emailServer = emailServer;
app.context.emailServer.connect(app);

// Passport must come after emailServer connect
app.use(passport.initialize());
app.use(passportConfig());

// Connect websockets
ws.on(WS_CONNECTION, (req: WebSocket) => {
  const connection = socket.connect(req);
  if (connection) {
    socket.listen(connection);
  }
});

routes(app);

const { LISTENING_ON } = EVENTS;

// if (!module.parent) {
  const port = process.env.PORT || STANDARD_PORT;
  server.listen(port);
  // eslint-disable-next-line
  console.log(`${LISTENING_ON}: ${port}`);
// }

// memwatch.on('leak', data => {
//   log.logger.fatal(data);
// });

export default { app, server };
