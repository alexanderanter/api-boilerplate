import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import path from 'path';
import config from 'config';
import bouncer from 'koa-bouncer';
import mongoose from 'mongoose';
import passport from 'koa-passport';

import errorHandling from './middlewares/error-handling';
import passportConfig from './middlewares/passport';

import init from './lib/init';
import routes from './routes';

const { uri, options } = config.get('mongoose');
mongoose.connect(
  uri,
  options,
);

const app = new Koa();

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

// init app
init(app);

// router
routes(app);

// error log
app.on('error', (err, ctx) => {
  // eslint-disable-next-line
  console.error('server error', err, ctx);
});

if (!module.parent) {
  const port = process.env.PORT || '8000';
  app.listen(port);
  // eslint-disable-next-line
  console.log('Listening on ' + port);
}

export default app;
