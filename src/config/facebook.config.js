import { clientID, clientSecret } from '../secrets/facebook';

export default {
  clientID,
  clientSecret,
  callbackURL: 'http://localhost:8080/auth/facebook/callback',
  profileURL:
    'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
};