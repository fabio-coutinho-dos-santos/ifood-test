import { DeleteResult, FindOneOptions, Repository } from "typeorm";
import { ProductModel } from "../entities/product.mongo.entity";
import { AppDataSource } from "../data-source";
import { CategoryRepositoryInterface } from "../../../../../domain/category/category.repository.interface";
import { CategoryModel } from "../entities/category.mongo.entity";
import Category from "../../../../../domain/category/category.entity";

export class CategoryRepository implements CategoryRepositoryInterface {
  private repository: Repository<CategoryModel>;

  constructor() {
    this.repository = AppDataSource.getRepository(CategoryModel);
  }

  async create(category: Category): Promise<CategoryModel> {
    const newCategory = {
      ownerId: category._ownerId,
      title: category._title,
      description: category._description,
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

  async findById(id: FindOneOptions<CategoryModel>): Promise<CategoryModel | null> {
    return await this.repository.findOne(id);
  }
}
