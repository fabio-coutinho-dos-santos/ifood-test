import { DeleteResult, FindOneOptions, Repository } from "typeorm";
import { ProductRepositoryInteface } from "../../../../../domain/product/product.repository.inteface";
import { ProductModel } from "../entities/product.mongo.entity";
import { AppDataSource } from "../data-source";
import { Product } from "../../../../../domain/product/product.entity";

export class ProductRepository implements ProductRepositoryInteface {
  private repository: Repository<ProductModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductModel);
  }

  async create(product: Product): Promise<ProductModel> {
    const newProduct = {
      ownerId: product._ownerId,
      title: product._title,
      description: product._description,
      price: product._price,
    };
    return await this.repository.save(newProduct);
  }

  async update(entity: any, id: string): Promise<unknown> {
    return await this.repository.update(id, entity)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
  
  async getAll(): Promise<ProductModel[]> {
    return await this.repository.find();
  }

  async findById(id: FindOneOptions<ProductModel>): Promise<ProductModel | null> {
    return await this.repository.findOne(id);
  }
}
