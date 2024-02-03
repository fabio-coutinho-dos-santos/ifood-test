import { MessageAttributeValue } from "@aws-sdk/client-sns"

export default interface QueueServiceInterface {
  setup(): void
  nofity(message: string, attributes?: MessageAttributeValue):Promise<Boolean>
}