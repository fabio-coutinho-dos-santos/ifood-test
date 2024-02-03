export const STORAGE_CONFIG = {
  awsRegion : process.env.AWS_REGION ?? 'region-default',
  accessKeyId : process.env.AWS_ACCESS_KEY ?? 'access-key',
  secretAccessKey : process.env.AWS_SECRET ?? 'secret-key',
  bucket: process.env.AWS_S3_BUCKET ?? 'bucket',
  fileBasePath: process.env.AWS_BUCKET_FILE_BASE_PATH ?? 'basePath'
} 