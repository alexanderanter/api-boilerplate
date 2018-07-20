module.exports = function(app, router) {
  const { user } = app.controllers;
  router.get('/users', user.list);
};
