import { DeleteResult } from "typeorm"

export interface RepositoryInterface<T> {
  create(entity: unknown): Promise<T>
  update(entity: T, id: string): Promise<unknown>
  delete(id: string): Promise<DeleteResult>
  getAll(): Promise<T[]>
}