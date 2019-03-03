import * as crypto from 'crypto';

const algorithm = 'aes-256-gcm';
const { SESSION_SECRET } = process.env;
const key = crypto
  .createHash('sha256')
  .update(String(SESSION_SECRET))
  .digest('base64')
  .substr(0, 32);

export interface EncryptedObject {
  IV: Buffer;
  encrypted: string;
  tag: Buffer;
  hash?: string;
}

/**
 * Encrypts a String
 *
 * @param {String} text
 * @returns {EncryptedObject} {Buffer: IV, String: encrypted, Buffer: tag}
 */
export const encrypt = (text: string): EncryptedObject => {
  const IV = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, IV);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { IV, encrypted, tag: cipher.getAuthTag() };
};

/**
 * Decrypts data
 *
 * @param {EncryptedObject} data { Buffer: IV, String: encrypted, Buffer: tag }
 * @returns {String} decrypted text
 */
export const decrypt = (data: EncryptedObject) => {
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
export const sha256 = (text: string) =>
  crypto
    .createHash('sha256')
    .update(text)
    .digest('hex');

export default {
  encrypt,
  decrypt,
  sha256,
};
