"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.deleteFromS3Bucket = exports.uploadToS3Bucket = exports.configS3 = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDSECRETKEY,
});
let S3 = null;
function configS3() {
    S3 = new aws_sdk_1.default.S3({
        signatureVersion: "v4",
        accessKeyId: process.env.ACCESSKEY,
        secretAccessKey: process.env.SECRETKEY,
        region: process.env.REGION,
        apiVersion: "latest",
    });
}
exports.configS3 = configS3;
const uploadToS3Bucket = (folderName, fileName, file) => __awaiter(void 0, void 0, void 0, function* () {
    let ext = fileName.split(".").pop();
    let random = Math.floor(Math.random() * 900000000000);
    fileName = random + "." + ext;
    return new Promise((resolve, reject) => {
        S3.upload({
            Key: folderName + '/' + fileName,
            Bucket: process.env.BUCKETNAME,
            ACL: process.env.FILEPERMISSION,
            Body: file,
        }, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
});
exports.uploadToS3Bucket = uploadToS3Bucket;
const deleteFromS3Bucket = (fileId) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        S3.deleteObject({
            Key: fileId,
            Bucket: process.env.BUCKETNAME,
        }, (error, data) => {
            if (error) {
                reject(error);
            }
            resolve(data);
        });
    });
});
exports.deleteFromS3Bucket = deleteFromS3Bucket;
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDSECRETKEY
});
function uploadToCloudinary(folderName, fileName, file) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            return {
                success: false,
                message: 'Invalid file',
                error: 'File is missing'
            };
        }
        try {
            const fileData = file.data instanceof Buffer
                ? `data:${file.mimetype};base64,${file.data.toString('base64')}`
                : file.data;
            const uploadResponse = yield cloudinary_1.v2.uploader.upload(fileData, {
                folder: folderName,
                public_id: fileName,
                resource_type: 'auto'
            });
            return {
                success: true,
                message: 'File uploaded successfully',
                url: uploadResponse.secure_url,
                publicId: uploadResponse.public_id
            };
        }
        catch (error) {
            console.error('Cloudinary upload error:', error);
            return {
                success: false,
                message: 'File upload failed',
                error: error.message
            };
        }
    });
}
exports.uploadToCloudinary = uploadToCloudinary;
