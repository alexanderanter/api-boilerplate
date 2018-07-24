module.exports = function(app, router) {
  const { ping } = app.controllers;
  router.get('/ping', ping.pong);
  router.get('/ping/email', ping.email);
};
