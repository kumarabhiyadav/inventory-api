import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import awsSDK from "aws-sdk";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDSECRETKEY,
});

let S3: any = null;
export function configS3() {
  S3 = new awsSDK.S3({
    signatureVersion: "v4",
    accessKeyId: process.env.ACCESSKEY!,
    secretAccessKey: process.env.SECRETKEY!,
    region: process.env.REGION,
    apiVersion: "latest",
  });
}

export const uploadToS3Bucket = async (folderName:string,fileName: string, file: any) => {
  let ext = fileName.split(".").pop();
  let random = Math.floor(Math.random() * 900000000000);
  fileName = random + "." + ext;

  return new Promise((resolve, reject) => {
    S3.upload(
      {
        Key: folderName+'/'+fileName,
        Bucket: process.env.BUCKETNAME!,
        ACL: process.env.FILEPERMISSION!,
        Body: file,
      },
      (error: Error, data: any) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });
};
export const deleteFromS3Bucket = async (fileId: string) => {
  return new Promise((resolve, reject) => {
    S3.deleteObject(
      {
        Key: fileId,
        Bucket: process.env.BUCKETNAME!,
      },
      (error: Error, data: any) => {
        if (error) {
          reject(error);
        }
        resolve(data);
      }
    );
  });
};


cloudinary.config({ 
  cloud_name: process.env.CLOUDNAME, 
  api_key: process.env.CLOUDAPIKEY, 
  api_secret: process.env.CLOUDSECRETKEY 
});

export async function uploadToCloudinary(folderName: string, fileName: string, file: any) {
  // Validate file input
  if (!file) {
    return { 
      success: false, 
      message: 'Invalid file', 
      error: 'File is missing' 
    };
  }

  try {
    // Convert Buffer to base64 if needed
    const fileData = file.data instanceof Buffer 
      ? `data:${file.mimetype};base64,${file.data.toString('base64')}` 
      : file.data;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(fileData, {
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
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return { 
      success: false, 
      message: 'File upload failed', 
      error: error.message 
    };
  }
}