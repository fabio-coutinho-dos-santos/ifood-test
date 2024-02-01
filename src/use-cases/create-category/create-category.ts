import { CategoryDto } from "../../domain/category/category.dto";
import Category from "../../domain/category/category.entity";
import { CategoryRepositoryInterface } from "../../domain/category/category.repository.interface";

export class CreateCategory {
  constructor(private readonly categoryRepository: CategoryRepositoryInterface){}

  async execute(input: CategoryDto) {
    const category = new Category(
      input.title,
      input.description,
      input.ownerId,
    )
    const categoryStored = await this.categoryRepository.create(category)
    return categoryStored;
  }
}