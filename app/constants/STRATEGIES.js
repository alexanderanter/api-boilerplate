/**
 * This file should contain all the passport strategy constants for the API
 * It is required and added to the context in the init stage.
 * After that any constant can be accessed like this:
 * ctx.constants.CONSTANT_NAME
 */

const FACEBOOK = 'facebook-token';
const GOOGLE = 'google-token';
const EMAIL = 'email';

module.exports = {
  FACEBOOK,
  GOOGLE,
  EMAIL,
};
