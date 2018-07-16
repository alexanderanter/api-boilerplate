import { clientID, clientSecret } from '../secrets/google';

export default {
  clientID,
  clientSecret,
  authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenURL: 'https://accounts.google.com/o/oauth2/token',
  callbackURL: 'http://localhost:8080/auth/google/callback',
};
