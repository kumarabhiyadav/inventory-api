import crypto from 'crypto';

export function encryptText(plainText:string, password=process.env.QRENC||'') {
  // Generate a random 16-byte initialization vector (IV)
  const iv = crypto.randomBytes(16);

  // Create a key from the password using a key derivation function (PBKDF2)
  const key = crypto.pbkdf2Sync(password, 'salt', 100000, 32, 'sha256'); // 32 bytes key for AES-256

  // Create the cipher using AES-256-CBC
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  // Encrypt the plain text
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Convert IV and encrypted text to base64 for easier storage/transmission
  const base64Encrypted = {
    cipherText: encrypted,
    iv: iv.toString('hex'),  // IV as hex to store or transmit
  };

  return base64Encrypted;
}


export function decryptText(encryptedData:any, password=process.env.QRENC||'') {
    const { cipherText, iv } = encryptedData;
    const key = crypto.pbkdf2Sync(password, 'salt', 100000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
  
    let decrypted = decipher.update(cipherText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  