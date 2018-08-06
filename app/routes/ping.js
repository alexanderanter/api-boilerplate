module.exports = function(app, router) {
  const { ping } = app.controllers;

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
};
