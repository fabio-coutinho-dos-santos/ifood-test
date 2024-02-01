import { DeleteResult, Repository } from "typeorm";
import { ProductRepositoryInteface } from "../../../../../domain/product/product.repository.inteface";
import { ProductModel } from "../entities/product.mongo.entity";
import { AppDataSource } from "../data-source";
import { Product } from "../../../../../domain/product/product.entity";
import { title } from "process";

export class ProductRepository implements ProductRepositoryInteface {
  private repository: Repository<ProductModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductModel);
  }

  async create(product: Product): Promise<ProductModel> {
    const newProduct = {
      ownerId: product.ownerId,
      title: product.title,
      description: product.description,
      price: product.price,
    };
    return await this.repository.save(newProduct);
  }

  update(entity: ProductModel, id: string): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
  
  async getAll(): Promise<ProductModel[]> {
    return await this.repository.find();
  }
}
