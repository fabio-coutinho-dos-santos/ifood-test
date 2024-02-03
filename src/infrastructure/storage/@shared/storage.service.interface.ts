export interface StorageServiceInterface {
  setup(): void
  getFile(ownerId: any): Promise<any>;
}
