import * as Router from 'koa-router';
import auth from '../controllers/auth';
import jwt from '../controllers/jwt';
import user from '../controllers/user';
import email from '../controllers/email';

export = (router: Router) => {
  /**
   * @api {post} /auth/google Request JSON Web Token by passing Google Authentication Token to the API
   * @apiName GoogleAuth
   * @apiGroup Auth
   *
   * @apiSuccess {String} token JSON Web Token
   * @apiSuccess {String} email User's email address
   * @apiSuccess {String} firstName User's first name
   * @apiSuccess {String} lastName User's first name
   * @apiSuccess {String} picture User's profile picture
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *   "token": "long-random-string",
   *   "user": {
   *     "email": "name@domain.com",
   *     "firstName": "Mr",
   *     "lastName": "Man",
   *     "picture": "path/to/picture",
   *   }
   * }
   *
   */
  router.post('/auth/google', auth.google, user.match, jwt.encode, jwt.send);

  /**
   * @api {post} /auth/facebook Authenticate with Facebook authentication token. Exchange for JWT
   * @apiName FacebookAuth
   * @apiGroup Auth
   *
   * @apiSuccess {String} token JSON Web Token
   * @apiSuccess {String} email User's email address
   * @apiSuccess {String} firstName User's first name
   * @apiSuccess {String} lastName User's first name
   * @apiSuccess {String} picture User's profile picture
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *   "token": "long-random-string",
   *   "user": {
   *     "email": "name@domain.com",
   *     "firstName": "Mr",
   *     "lastName": "Man",
   *     "picture": "path/to/picture",
   *   }
   * }
   *
   */
  router.post(
    '/auth/facebook',
    auth.facebook,
    user.match,
    jwt.encode,
    jwt.send,
  );

  /**
   * @api {post} /auth/email First step of passwordless authentication with email
   * @apiName EmailAuth
   * @apiGroup Auth
   *
   * @apiSuccess {String} message: Success message telling the user to check their email
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *   "message": "Success! Check your email for the login link"
   * }
   *
   */
  router.post(
    '/auth/email',
    auth.createEmailToken,
    user.saveEmailToken,
    email.send,
  );

  /**
   * @api {post} /auth/email/token Second step of passwordless email authentication
   * @apiName EmailAuthToken
   * @apiGroup Auth
   *
   * @apiSuccess {String} token JSON Web Token
   * @apiSuccess {String} email User's email address
   * @apiSuccess {String} firstName User's first name
   * @apiSuccess {String} lastName User's first name
   * @apiSuccess {String} picture User's profile picture
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *   "token": "long-random-string",
   *   "user": {
   *     "email": "name@domain.com",
   *     "firstName": "Mr",
   *     "lastName": "Man",
   *     "picture": "path/to/picture",
   *   }
   * }
   *
   */
  router.post('/auth/email/token', auth.verifyEmailToken, jwt.encode, jwt.send);

  /**
   * @api {post} /auth/token Decode the token and return the user
   * @apiName TokenAuth
   * @apiGroup Auth
   *
   * @apiSuccess {String} email User's email address
   * @apiSuccess {String} firstName User's first name
   * @apiSuccess {String} lastName User's first name
   * @apiSuccess {String} picture User's profile picture
   *
   * @apiSuccessExample {JSON} Success-Response:
   * {
   *   "user": {
   *     "email": "name@domain.com",
   *     "firstName": "Mr",
   *     "lastName": "Man",
   *     "picture": "path/to/picture",
   *   }
   * }
   *
   */
  router.post('/auth/token', jwt.decode, jwt.safeDecodeUser, jwt.send);
};
