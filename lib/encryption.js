const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const sessionSecret = process.env.SESSION_SECRET;
const key = Buffer.from(sessionSecret, 'utf8');

const encrypt = text => {
  const IV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    IV,
    encrypted,
    tag: cipher.getAuthTag(),
  };
};

const decrypt = data => {
  const { IV, encrypted, tag } = data;
  const decipher = crypto.createDecipheriv(algorithm, key, IV);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

const sha256 = text =>
  crypto
    .createHash('sha256')
    .update(text)
    .digest('hex');

module.exports = {
  encrypt,
  decrypt,
  sha256,
};
