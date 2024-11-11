"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptText = exports.encryptText = void 0;
const crypto_1 = __importDefault(require("crypto"));
function encryptText(plainText, password = process.env.QRENC || '') {
    const iv = crypto_1.default.randomBytes(16);
    const key = crypto_1.default.pbkdf2Sync(password, 'salt', 100000, 32, 'sha256');
    const cipher = crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const base64Encrypted = {
        cipherText: encrypted,
        iv: iv.toString('hex'),
    };
    return base64Encrypted;
}
exports.encryptText = encryptText;
function decryptText(encryptedData, password = process.env.QRENC || '') {
    const { cipherText, iv } = encryptedData;
    const key = crypto_1.default.pbkdf2Sync(password, 'salt', 100000, 32, 'sha256');
    const decipher = crypto_1.default.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(cipherText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.decryptText = decryptText;
