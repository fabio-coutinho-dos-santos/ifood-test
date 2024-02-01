import { FindOneOptions } from "typeorm";
import Category from "../../domain/category/category.entity";
import { ProductRepositoryInteface } from "../../domain/product/product.repository.inteface";
import { CategoryModel } from "../../infrastructure/database/typeorm/mongodb/entities/category.mongo.entity";
import { ProductModel } from "../../infrastructure/database/typeorm/mongodb/entities/product.mongo.entity";

export default class SetCategory {
  constructor(private readonly productRepository: ProductRepositoryInteface){}

  async execute(categoryStored: CategoryModel, product: ProductModel) {
    const category = new Category(
      categoryStored.title,
      categoryStored.description,
      categoryStored.ownerId
    )
    product.category = categoryStored;
    await this.productRepository.update(product, product._id)
    return await this.productRepository.findById(product._id as FindOneOptions)
  }

}