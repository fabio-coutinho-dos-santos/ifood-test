import { ProductDto } from "../../domain/product/product.dto";
import { Product } from "../../domain/product/product.entity";
import { ProductRepositoryInteface } from "../../domain/product/product.repository.inteface";
import { ProductModel } from "../../infrastructure/database/typeorm/mongodb/entities/product.mongo.entity";

export default class CreateProduct {
  constructor(private readonly productRepository: ProductRepositoryInteface) {}

  async execute(productDto: ProductDto) {
    const newProduct = new Product(
      productDto.ownerId,
      productDto.title,
      productDto.description,
      productDto.price,
      )
    return this.productRepository.create(newProduct)
  }
}
