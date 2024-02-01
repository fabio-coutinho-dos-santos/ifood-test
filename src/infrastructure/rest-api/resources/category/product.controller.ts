import "reflect-metadata";
import "express-async-errors";
import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { InternalServerError } from "../../helpers/ApiErrors";
import { CategoryRepositoryInterface } from "../../../../domain/category/category.repository.interface";
import { CategoryDto } from "../../../../domain/category/category.dto";

@Controller("api/categories")
export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepositoryInterface) {}

  @Post()
  async create(req: Request, res: Response) {
    try {
      const categoryDto: CategoryDto = req.body;
      return res.status(200).json(categoryDto);
    } catch (error: unknown) {
      console.log(error);
      throw new InternalServerError();
    }
  }

  @Get()
  async getAll(req: Request, res: Response) {
    const products = await this.categoryRepository.getAll();
    return res.status(200).json(products);
  }

  @Delete(":id")
  async delete(req: Request, res: Response) {
    const id = req.params.id;
    const deleted = await this.categoryRepository.delete(id);
    return res.status(204).json(deleted);
  }
}
