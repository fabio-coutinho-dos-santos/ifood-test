import { StorageServiceInterface } from "../@shared/storage.service.interface";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { STORAGE_CONFIG } from "../config";

export default class S3Service implements StorageServiceInterface {
  private s3Client: S3Client;

  constructor() {
    this.setup();
  }

  setup() {
    this.s3Client = new S3Client({
      region: STORAGE_CONFIG.awsRegion,
      credentials: {
        accessKeyId: STORAGE_CONFIG.accessKeyId,
        secretAccessKey: STORAGE_CONFIG.secretAccessKey,
      },
    });
  }

  async getFile(ownerId: string): Promise<unknown> {
    try {
      const path = STORAGE_CONFIG.fileBasePath.replace("OWNER_ID", ownerId);
      const payload = {
        Bucket: STORAGE_CONFIG.bucket,
        Key: path,
      };
      const command = new GetObjectCommand(payload);
      const data: any = await this.s3Client.send(command);
      const jsonString = await data.Body.transformToString();
      return Promise.resolve(JSON.parse(jsonString) ?? []);
    } catch (error: unknown) {
      console.log(String(error));
      throw new Error(String(error));
    }
  }
}
