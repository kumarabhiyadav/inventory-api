import awsSDK from "aws-sdk";

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


