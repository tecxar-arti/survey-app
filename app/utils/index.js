import moment from 'moment';
import crypto from 'crypto';

const IV_LENGTH = 16; // For AES, this is always 16
const getHeader = () => {
  const now = moment()
    .seconds(0)
    .milliseconds(0);
  const hashNow = crypto
    .createHash('md5')
    .update(now.toISOString())
    .digest('hex');

  return { authorization: hashNow, accessKey: encrypt(hashNow) };
};

const encrypt = plainText => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(process.env.ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(plainText);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};
export default { getHeader, encrypt };
