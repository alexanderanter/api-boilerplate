module.exports = function(app, router) {
  const { auth, jwt, user, email } = app.controllers;

  router.post('/auth/google', auth.google, user.match, jwt.encode, jwt.send);
  router.post(
    '/auth/facebook',
    auth.facebook,
    user.match,
    jwt.encode,
    jwt.send,
  );
  router.post(
    '/auth/email',
    auth.createEmailToken,
    user.saveEmailToken,
    email.send,
  );
  router.post('/auth/email/token', auth.verifyEmailToken, jwt.encode, jwt.send);
  router.post('/auth/token', jwt.decode, jwt.safeDecodeUser, jwt.send);
};
