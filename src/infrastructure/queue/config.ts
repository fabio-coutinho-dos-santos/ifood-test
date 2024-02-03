export const QUEUE_CONFIG = {
  awsRegion : process.env.AWS_REGION ?? 'region-default',
  accessKeyId : process.env.AWS_ACCESS_KEY ?? 'access-key',
  secretAccessKey : process.env.AWS_SECRET ?? 'secret-key',
  topic: process.env.AWS_SNS_TOPIC ?? 'topic',
}