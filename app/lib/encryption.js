const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const sessionSecret = process.env.SESSION_SECRET;
const key = Buffer.from(sessionSecret, 'utf8');

/**
 * Encrypted object class
 *
 * @class EncryptedObject
 */
class EncryptedObject {
  constructor(IV, encrypted, tag) {
    this.IV = IV;
    this.encrypted = encrypted;
    this.tag = tag;
  }

  getAsObject() {
    return {
      IV: this.IV,
      encrypted: this.encrypted,
      tag: this.tag,
      hash: this.hash,
    };
  }
}

/**
 * Encrypts a String
 *
 * @param {String} text
 * @returns {EncryptedObject} {Buffer: IV, String: encrypted, Buffer: tag}
 */
const encrypt = text => {
  const IV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return new EncryptedObject(IV, encrypted, cipher.getAuthTag());
};

/**
 * Decrypts data
 *
 * @param {EncryptedObject} data { Buffer: IV, String: encrypted, Buffer: tag }
 * @returns {String} decrypted text
 */
const decrypt = data => {
  const { IV, encrypted, tag } = data;
  const decipher = crypto.createDecipheriv(algorithm, key, IV);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

/**
 * Hashes text using the sha256 algorithm
 *
 * @param {String} text
 * @returns {String} sha256 hashed text
 */
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
