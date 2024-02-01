import { DeleteResult, Repository } from "typeorm";
import { ProductRepositoryInteface } from "../../../../../domain/product/product.repository.inteface";
import { ProductModel } from "../entities/product.mongo.entity";
import { AppDataSource } from "../data-source";
import { Product } from "../../../../../domain/product/product.entity";
import { title } from "process";
import { CategoryRepositoryInterface } from "../../../../../domain/category/category.repository.interface";
import { CategoryModel } from "../entities/category.mongo.entity";
import Category from "../../../../../domain/category/category.entity";

export class CategoryRepository implements CategoryRepositoryInterface {
  private repository: Repository<CategoryModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductModel);
  }

  async create(category: Category): Promise<CategoryModel> {
    const newCategory = {
      ownerId: category.ownerId,
      title: category.title,
      description: category.description,
    };
    return await this.repository.save(newCategory);
  }

  update(entity: ProductModel, id: string): Promise<unknown> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
  
  async getAll(): Promise<CategoryModel[]> {
    return await this.repository.find();
  }
}
