import { RepositoryInterface } from "../@shared/repository.interface";
import { CategoryModel } from "../../infrastructure/database/typeorm/mongodb/entities/category.mongo.entity";

export interface CategoryRepositoryInterface
  extends RepositoryInterface<CategoryModel> {}
