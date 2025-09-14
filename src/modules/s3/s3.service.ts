import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";
import { extname } from "path";

@Injectable()
export class s3Service {
    private readonly s3: S3;

    constructor() {
        this.s3 = new S3({
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY
            },
            endpoint: process.env.S3_ENDPOINT,
            region: "default"
        })
    }

    async uploadFile(file: Express.Multer.File, folderName: string) {
        const ext = extname(file.originalname); // returns file format
        return await this.s3.upload({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${folderName}/${Date.now()}${ext}`, // file name
            Body: file.buffer // change file to binary format
        }).promise();
    }
    async deleteFile(Key: string) {
        return await this.s3.deleteObject({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: decodeURI(Key)// file name
        }).promise();
    }
}