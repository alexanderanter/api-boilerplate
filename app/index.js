const Koa = require('koa');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const bouncer = require('koa-bouncer');
const passport = require('koa-passport');
const http = require('http');

const errorHandling = require('./middlewares/error-handling');
const passportConfig = require('./middlewares/passport');

const emailServer = require('./lib/emailServer');
const init = require('./lib/init');
const routes = require('./routes');
const socket = require('./socket');
const db = require('./lib/db');

const {
  WS_CONNECTION,
  STANDARD_PORT,
  STATIC_FOLDER,
  UPLOADS_FOLDER,
  DEVELOPMENT,
} = require('./constants/CONFIGS');

const app = new Koa();
const server = http.createServer(app.callback());
const ws = socket.init(server);

app.use(db.connect());

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
    formidable: { uploadDir: UPLOADS_FOLDER },
    multipart: true,
    urlencoded: true,
  }),
);
app.use(helmet());
app.use(cors());
if (app.env === DEVELOPMENT) {
  app.use(logger());
}

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

const { ERROR, SERVER_ERROR, LISTENING_ON } = app.constants.EVENTS;

// error log
app.on(ERROR, (err, ctx) => {
  // eslint-disable-next-line
  console.error(SERVER_ERROR, err, ctx);
});

if (!module.parent) {
  const port = process.env.PORT || STANDARD_PORT;
  server.listen(port);
  // eslint-disable-next-line
  console.log(`${LISTENING_ON} port: ${port}`);
}

module.exports = { app, server };
