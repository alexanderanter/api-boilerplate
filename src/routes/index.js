// const config = require('config');
import Router from 'koa-router';
import fs from 'fs';

// const { secret } = config.get('jwt');
// const jwt = require('koa-jwt')({ secret });

export default function routes(app) {
  const router = new Router();

  fs.readdirSync('./routes').forEach(file => {
    if (file.substr(-3, 3) === '.js' && file !== 'index.js') {
      // eslint-disable-next-line
      require('./' + file.replace('.js', ''))(app, router);
    }
  });

  app.use(router.routes()).use(router.allowedMethods());
}
