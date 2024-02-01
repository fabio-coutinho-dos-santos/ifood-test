import { ProductModel } from "../../infrastructure/database/typeorm/mongodb/entities/product.mongo.entity";
import { RepositoryInterface } from "../@shared/repository.interface";

export interface ProductRepositoryInteface extends RepositoryInterface<ProductModel> {
  
}