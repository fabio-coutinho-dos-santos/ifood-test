import {
  MessageAttributeValue,
  PublishCommand,
  SNSClient,
} from "@aws-sdk/client-sns";
import { QUEUE_CONFIG } from "../config";
import QueueServiceInterface from "../@shared/queue.service.inteface";

export default class SnsQueueService implements QueueServiceInterface {
  private snsClient: SNSClient;

  setup(): void {
    this.snsClient = new SNSClient({
      region: QUEUE_CONFIG.awsRegion,
      credentials: {
        accessKeyId: QUEUE_CONFIG.accessKeyId,
        secretAccessKey: QUEUE_CONFIG.secretAccessKey,
      },
    });
  }

  async nofity(
    message: string,
    attributes: MessageAttributeValue
  ): Promise<Boolean> {
    try {
      await this.snsClient.send(
        new PublishCommand({
          Message: message,
          TopicArn: QUEUE_CONFIG.topic,
          MessageAttributes: {
            attributes,
          },
        })
      );
      console.log('Message sent');
      return Promise.resolve(true);
    } catch (error: unknown) {
      console.log(String(error));
      return Promise.resolve(false);
    }
  }
}
