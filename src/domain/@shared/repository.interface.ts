import { DeleteResult, FindOneOptions } from "typeorm"

export interface RepositoryInterface<T> {
  create(entity: unknown): Promise<T>
  update(entity: unknown, id: string): Promise<unknown>
  delete(id: string): Promise<DeleteResult>
  getAll(): Promise<T[]>
  findById(id: FindOneOptions<T>): Promise<T | null>
}