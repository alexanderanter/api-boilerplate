const Router = require('koa-router');
const fs = require('fs');

/**
 * Reads all routes within the routes dir and initializes the routes with app and router objects
 *
 * @param {*} app
 */
module.exports = function routes(app) {
  const router = new Router();

  fs.readdirSync('./routes').forEach(file => {
    if (file.substr(-3, 3) === '.js' && file !== 'index.js') {
      // eslint-disable-next-line
      require('./' + file.replace('.js', ''))(app, router);
    }
  });

  app.use(router.routes()).use(router.allowedMethods());
};
