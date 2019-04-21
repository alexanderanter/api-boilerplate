import Router from 'koa-router';
import ping from '../controllers/ping';

export = (router: Router) => {
  /**
   *
   * @api {get} /ping Ping
   * @apiName Ping
   * @apiGroup Ping
   *
   * @apiSuccess (200) {String} message Pong response
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *     "message": "Pong!"
   * }
   *
   *
   */
  router.get('/ping', ping.pong);
  router.get('/test/error', ping.error);
};
