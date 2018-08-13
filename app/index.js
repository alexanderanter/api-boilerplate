const Koa = require('koa');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const bouncer = require('koa-bouncer');
const passport = require('koa-passport');
const http = require('http');
const send = require('koa-send');
const memwatch = require('memwatch-next');

const errorHandling = require('./middlewares/error-handling');
const passportConfig = require('./middlewares/passport');
const logging = require('./middlewares/logging');

const emailServer = require('./lib/emailServer');
const init = require('./lib/init');
const routes = require('./routes');
const socket = require('./socket');
const db = require('./lib/db');

const {
  WS_CONNECTION,
  STANDARD_PORT,
  STATIC_FOLDER,
} = require('./constants/CONFIG');

const app = new Koa();
const server = http.createServer(app.callback());
const ws = socket.init(server);

app.context.send = send;

app.use(db.connect());

// Logging
app.use(logging());

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
ws.on(WS_CONNECTION, req => {
  const connection = socket.connect(req);
  if (connection) {
    socket.listen(connection);
  }
});

routes(app);

const { LISTENING_ON } = app.constants.EVENTS;

if (!module.parent) {
  const port = process.env.PORT || STANDARD_PORT;
  server.listen(port);
  // eslint-disable-next-line
  console.log(`${LISTENING_ON}: ${port}`);
}

module.exports = { app, server };
memwatch.on('leak', info => {
  // eslint-disable-next-line
  console.log(info);
});
