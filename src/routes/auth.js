module.exports = function(app, router) {
  const { auth, jwt } = app.controllers;

  router.post('/auth/google', auth.google, jwt.encode, jwt.send);
  router.post('/auth/local', auth.local);
  router.post('/auth/facebook', auth.facebook, jwt.encode, jwt.send);
  router.post('/auth/facebook/callback', auth.facebookCallback);
  router.post('/auth/token', jwt.decode, jwt.safeDecodeUser, jwt.send);
};
