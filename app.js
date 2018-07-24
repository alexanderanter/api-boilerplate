const Koa = require('koa');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const config = require('config');
const bouncer = require('koa-bouncer');
const mongoose = require('mongoose');
const passport = require('koa-passport');
// const socket = require('socket.io');
const http = require('http');
const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');

const errorHandling = require('./middlewares/error-handling');
const passportConfig = require('./middlewares/passport');

const emailServer = require('./lib/emailServer');
const init = require('./lib/init');
const routes = require('./routes');
const socket = require('./socket');

const { uri, options } = config.get('mongoose');
const { url } = config.get('passwordless');
mongoose.connect(
  uri,
  options,
);

const app = new Koa();
const server = http.createServer(app.callback());
const io = socket.init(server);

// error handling
app.use(errorHandling());

// validate
app.use(bouncer.middleware());

// static
app.use(koaStatic(path.resolve(__dirname, './public')));

// middleware
app.use(
  koaBody({
    json: true,
    strict: false,
  }),
);
app.use(helmet());
app.use(cors());
if (app.env === 'development') {
  app.use(logger());
}
app.use(passport.initialize());
app.use(passportConfig());

// Email server
app.context.emailServer = emailServer;
app.context.emailServer.connect();

// Connect websockets
io.on('connection', s => {
  socket.listen(s);
});

init(app);
routes(app);

// error log
app.on('error', (err, ctx) => {
  // eslint-disable-next-line
  console.error('server error', err, ctx);
});

if (!module.parent) {
  const port = process.env.PORT || '8080';
  server.listen(port);
  // eslint-disable-next-line
  console.log('Listening on ' + port);
}
