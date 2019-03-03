import * as Router from 'koa-router';
import * as Koa from 'koa';
import * as fs from 'fs';

/**
 * Reads all routes within the routes dir and initializes the routes with app and router objects
 *
 * @param {*} app
 */
export default function routes(app: Koa) {
  const router = new Router();

  fs.readdirSync(__dirname).forEach(file => {
    if (file.substr(-3, 3) === '.ts' && file !== 'index.ts') {
      // eslint-disable-next-line
      require(`${__dirname}/${file.replace('.ts', '')}`)(router);
    }
  });

  app.use(router.routes()).use(router.allowedMethods());
}
